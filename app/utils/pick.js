// /**
//  * Create an object composed of the picked object properties
//  * @param {Object} object
//  * @param {string[]} keys
//  * @returns {Object}
//  */
// const pick = (object, keys) => {
//   return keys.reduce((obj, key) => {
//     if (object && Object.prototype.hasOwnProperty.call(object, key)) {
//       // eslint-disable-next-line no-param-reassign
//       obj[key] = object[key];
//     }
//     return obj;
//   }, {});
// };

// module.exports = pick;
/**
 * Create an object composed of the picked object properties, supporting both key renaming and direct keys
 * @param {Object} object - The source object
 * @param {Array<string | [string, string]> | Object} keysOrKeyMap - Keys to pick directly or a mapping for renaming
 * @returns {Object}
 */

// const mixedKeys = [
//   'country', // Direct key picking
//   ['name', 'firstName'], // Renaming
//   ['surname', 'lastName'] // Renaming
// ];

const pick = (object, keysOrKeyMap) => {
  const result = {};

  if (Array.isArray(keysOrKeyMap)) {
    // Handle mixed array of keys and mappings
    keysOrKeyMap.forEach((key) => {
      if (typeof key === 'string') {
        // Direct key picking
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
          result[key] = object[key];
        }
      } else if (Array.isArray(key) && key.length === 2) {
        // Key renaming [targetKey, sourceKey]
        const [targetKey, sourceKey] = key;
        if (object && Object.prototype.hasOwnProperty.call(object, sourceKey)) {
          result[targetKey] = object[sourceKey];
        }
      }
    });
  } else if (typeof keysOrKeyMap === 'object' && keysOrKeyMap !== null) {
    // Handle key mapping object
    Object.entries(keysOrKeyMap).forEach(([targetKey, sourceKey]) => {
      if (object && Object.prototype.hasOwnProperty.call(object, sourceKey)) {
        result[targetKey] = object[sourceKey];
      }
    });
  } else {
    throw new TypeError('keysOrKeyMap must be an array or an object');
  }

  return result;
};

module.exports = pick;

