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
    if (pathObj.instance === 'Array' && pathObj.caster?.instance === 'String') {
      stringPaths.push(fullPath);
    }
    if (pathObj.schema) {
      stringPaths = stringPaths.concat(collectStringPaths(pathObj.schema, fullPath));
    }
  });
  return stringPaths;
}

module.exports = function searchPlugin(schema, options = {}) {
  const {
    stringFields = [],
    numberFields = [],
    dateFields = [],
    refFields = {}, // schema-level default ref fields
  } = options;

  const autoStringFields = collectStringPaths(schema);
  const allStringFields = stringFields.length ? stringFields : autoStringFields;

  const allNumberFields = numberFields.length
    ? numberFields
    : Object.entries(schema.paths).filter(([_, p]) => p.instance === 'Number').map(([k]) => k);

  const allDateFields = dateFields.length
    ? dateFields
    : Object.entries(schema.paths).filter(([_, p]) => p.instance === 'Date').map(([k]) => k);

  schema.statics.search = async function (searchParams = {}, dynamicRefFields = {}) {
    const { search, field, startDate, endDate } = searchParams;
    const searchTerm = search ? search.toString().trim() : '';

    // Merge schema-level refFields with dynamic ones from params
    const activeRefFields = { ...refFields, ...dynamicRefFields };

    const orFilters = [];

    // ✅ STRING fields
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

    // ✅ DATE fields
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

    // ✅ DATE range filter
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

    let baseFilter = {};
    if (orFilters.length) baseFilter.$or = orFilters;
    if (dateFilters.length) {
      baseFilter = baseFilter.$or
        ? { $and: [{ $or: baseFilter.$or }, ...dateFilters] }
        : { $and: dateFilters };
    }

    // ✅ Ref fields filter (merged schema + params)
    let refMatchFilter = {};
    if (searchTerm && Object.keys(activeRefFields).length) {
      const regex = { $regex: searchTerm, $options: 'i' };
      const refOrConditions = [];

   

      // Build conditions for ref fields
      Object.entries(activeRefFields).forEach(([refField, subFields]) => {
        const arr = Array.isArray(subFields) ? subFields : [subFields];
        arr.forEach(sub => {
          refOrConditions.push({ [`${refField}.${sub}`]: regex });
        });
      });


      if (refOrConditions.length) {
        const pipeline = [];

        // Only lookup for fields present in merged refFields
        Object.keys(activeRefFields).forEach(refField => {
          const pathObj = schema.paths[refField];
          
          // Check if the field exists in schema and has a ref
          if (pathObj && pathObj.options && pathObj.options.ref) {
            try {
              const refModel = mongoose.model(pathObj.options.ref);
              pipeline.push({
                $lookup: {
                  from: refModel.collection.name,
                  localField: refField,
                  foreignField: '_id',
                  as: refField
                }
              });
              pipeline.push({ 
                $unwind: { 
                  path: `$${refField}`, 
                  preserveNullAndEmptyArrays: true 
                } 
              });
            } catch (error) {
              console.error(`Error looking up model for ref field ${refField}:`, error.message);
              // Skip this ref field if model doesn't exist
              return;
            }
          } else {
            console.warn(`Warning: Field ${refField} is not a valid reference field in the schema`);
          }
        });

        // Only proceed if we have valid lookups
        if (pipeline.length > 0) {
          pipeline.push({ $match: { $or: refOrConditions } });
          pipeline.push({ $project: { _id: 1 } });


          try {
            const aggResult = await this.aggregate(pipeline).exec();
            const matchingIds = aggResult.map(doc => doc._id);
            
            if (matchingIds.length) {
              refMatchFilter = { _id: { $in: matchingIds } };
            }
          } catch (error) {
            console.error('Aggregation error:', error.message);
            // If aggregation fails, continue without ref field filtering
          }
        }
      }
    }

    // Merge baseFilter + refMatchFilter
    let finalFilter = {};
    if (Object.keys(baseFilter).length && Object.keys(refMatchFilter).length) {
      finalFilter = { $or: [baseFilter, refMatchFilter] };
    } else if (Object.keys(refMatchFilter).length) {
      finalFilter = refMatchFilter;
    } else if (Object.keys(baseFilter).length) {
      finalFilter = baseFilter;
    }

    return finalFilter;
  };
};
