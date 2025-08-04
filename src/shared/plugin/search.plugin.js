const mongoose = require('mongoose');
const moment = require('moment');

/**
 * Recursively collects all string field paths from a mongoose schema
 */
function collectStringPaths(schema, prefix = '') {
  let stringPaths = [];
  Object.entries(schema.paths).forEach(([key, pathObj]) => {
    const fullPath = prefix ? `${prefix}.${key}` : key;

    if (pathObj.instance === 'String') {
      stringPaths.push(fullPath);
    }
    if (pathObj.instance === 'Array') {
      if (pathObj.caster && pathObj.caster.instance === 'String') {
        stringPaths.push(fullPath);
      }
    }
    // handle nested schemas (SingleNested or Subdocument)
    if (pathObj.schema) {
      stringPaths = stringPaths.concat(collectStringPaths(pathObj.schema, fullPath));
    }
  });

  return stringPaths;
}

module.exports = function searchPlugin(schema, options = {}) {
  const {
    stringFields = [], // explicit string fields
    numberFields = [],
    dateFields = [],
    refFields = {},    // static defaults
  } = options;

  // collect all string fields automatically (including nested)
  const autoStringFields = collectStringPaths(schema);
  const allStringFields = stringFields.length > 0 ? stringFields : autoStringFields;

  // auto-detect top-level numeric/date fields
  const allNumberFields = numberFields.length > 0
    ? numberFields
    : Object.entries(schema.paths).filter(([_, p]) => p.instance === 'Number').map(([k]) => k);

  const allDateFields = dateFields.length > 0
    ? dateFields
    : Object.entries(schema.paths).filter(([_, p]) => p.instance === 'Date').map(([k]) => k);

  console.log('🔍 [searchPlugin] Auto string fields detected (including nested):', allStringFields);

  /**
   * Main search function
   */
  schema.statics.search = async function (searchParams = {}, dynamicRefFields = null) {
    const { search, field, startDate, endDate } = searchParams;
    const searchTerm = search ? search.toString().trim() : '';
    console.log('🟢 [searchPlugin] searchTerm:', searchTerm);

    const activeRefFields =
      dynamicRefFields && Object.keys(dynamicRefFields).length > 0
        ? dynamicRefFields
        : refFields;

    const orFilters = [];

    // ✅ STRING fields (auto includes nested)
    if (searchTerm) {
      if (field && allStringFields.includes(field)) {
        orFilters.push({ [field]: { $regex: searchTerm, $options: 'i' } });
      } else {
        allStringFields.forEach(f => {
          orFilters.push({ [f]: { $regex: searchTerm, $options: 'i' } });
        });
      }
    }

    // ✅ NUMBER fields
    if (searchTerm && !isNaN(Number(searchTerm))) {
      const numValue = Number(searchTerm);
      if (field && allNumberFields.includes(field)) {
        orFilters.push({ [field]: numValue });
      } else {
        allNumberFields.forEach(f => {
          orFilters.push({ [f]: numValue });
        });
      }
    }

    // ✅ DATE fields (direct)
    if (searchTerm) {
      const parsed = moment(searchTerm, ['MM/DD/YYYY', 'YYYY-MM-DD'], true);
      if (parsed.isValid()) {
        const dayStart = parsed.startOf('day').toDate();
        const dayEnd = parsed.endOf('day').toDate();
        allDateFields.forEach(f => {
          orFilters.push({ [f]: { $gte: dayStart, $lte: dayEnd } });
        });
      }
    }

    // ✅ DATE range
    const dateFilters = [];
    if (startDate || endDate) {
      const start = startDate ? moment(startDate).startOf('day').toDate() : null;
      const end = endDate ? moment(endDate).endOf('day').toDate() : null;
      allDateFields.forEach(f => {
        const df = {};
        if (start) df.$gte = start;
        if (end) df.$lte = end;
        if (Object.keys(df).length > 0) dateFilters.push({ [f]: df });
      });
    }

    // base filter from local fields
    let baseFilter = {};
    if (orFilters.length > 0) baseFilter.$or = orFilters;
    if (dateFilters.length > 0) {
      baseFilter = baseFilter.$or
        ? { $and: [{ $or: baseFilter.$or }, ...dateFilters] }
        : { $and: dateFilters };
    }

    console.log('🟡 [searchPlugin] baseFilter:', JSON.stringify(baseFilter, null, 2));

    // ✅ Ref fields (lookup)
    let refMatchFilter = {};
    if (searchTerm && Object.keys(activeRefFields).length > 0) {
      const regex = { $regex: searchTerm, $options: 'i' };
      const refOrConditions = [];
      Object.entries(activeRefFields).forEach(([refField, subFields]) => {
        const arr = Array.isArray(subFields) ? subFields : [subFields];
        arr.forEach(sub => {
          refOrConditions.push({ [`${refField}.${sub}`]: regex });
        });
      });

      if (refOrConditions.length > 0) {
        const pipeline = [];
       
        Object.entries(schema?.paths)?.forEach(([key, path]) => {
          if (path.options && path.options.ref) {
            const refModel = mongoose.model(path.options.ref);
           
            pipeline.push({
              $lookup: {
                from: refModel.collection.name,
                localField: key,
                foreignField: '_id',
                as: key
              }
            });
            pipeline.push({ $unwind: { path: `$${key}`, preserveNullAndEmptyArrays: true } });
          }
        });

        pipeline.push({ $match: { $or: refOrConditions } });
        pipeline.push({ $project: { _id: 1 } });

        console.log('🛠 [searchPlugin] Final aggregation pipeline for refs:', JSON.stringify(pipeline, null, 2));
        const aggResult = await this.aggregate(pipeline).exec();
        console.log('📥 [searchPlugin] Aggregation result for refs:', aggResult);

        const matchingIds = aggResult.map(doc => doc._id);
        if (matchingIds.length > 0) {
          refMatchFilter = { _id: { $in: matchingIds } };
        }
      }
    }

    // merge
    let finalFilter = {};
    if (Object.keys(baseFilter).length > 0 && Object.keys(refMatchFilter).length > 0) {
      finalFilter = { $or: [baseFilter, refMatchFilter] };
    } else if (Object.keys(refMatchFilter).length > 0) {
      finalFilter = refMatchFilter;
    } else {
      finalFilter = baseFilter;
    }

    console.log('🎯 [searchPlugin] Final merged filter:', JSON.stringify(finalFilter, null, 2));
    return finalFilter;
  };
};
