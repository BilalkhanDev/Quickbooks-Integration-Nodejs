// // middlewares/parseMultipartJsonFields.js

// module.exports = function parseMultipartJsonFields(req, res, next) {
//   try {
 
//     if (typeof req.body.inspectedBy === 'string') {
//       req.body.inspectedBy = JSON.parse(req.body.inspectedBy);
//     }

//     if (typeof req.body.itemValues === 'string') {
//       req.body.itemValues = JSON.parse(req.body.itemValues);
//     }

//     if (typeof req.body.status === 'string') {
//       req.body.status = parseInt(req.body.status);
//     }

//     next();
//   } catch (error) {
//     console.error("JSON Parse Error:", error.message);
//     return res.status(400).json({
//       success: false,
//       message: "Invalid JSON format in form fields.",
//     });
//   }
// };
// middlewares/parseMultipartFields.js

module.exports = function parseMultipartFields(fieldsConfig = {}) {
  return function (req, res, next) {
    try {
      for (const [field, type] of Object.entries(fieldsConfig)) {
        const raw = req.body[field];

        if (typeof raw !== 'string') continue;

        if (type === 'json') {
          try {
            req.body[field] = JSON.parse(raw);
          } catch (e) {
            throw new Error(`Invalid JSON in field "${field}"`);
          }
        } else if (type === 'number') {
          const num = parseInt(raw);
          if (isNaN(num)) throw new Error(`Invalid number in field "${field}"`);
          req.body[field] = num;
        } else if (type === 'boolean') {
          req.body[field] = raw === 'true';
        }
      }

      next();
    } catch (error) {
      console.error("Parsing Error:", error.message);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
};
