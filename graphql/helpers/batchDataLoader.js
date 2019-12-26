const _ = require("lodash");

// Defining Batch Loading Function
// Batch loading function accepts an arrays of keys and returns a promise
// which resolves to an array of values
module.exports = {
  // for returning array of items
  groupBy: async (key, keys, model, method, order) => {
    const results = await model[method]({
      where: { [key]: keys },
      order: order || [["updatedAt", "DESC"]]
    });
    const gc = _.groupBy(results, key);

    return keys.map(key => gc[key] || []);
  },
  // for returning single item
  keyBy: async (key, keys, model, method) => {
    const results = await model[method]({ where: { [key]: keys } });
    const gc = _.keyBy(results, key);
    return keys.map(key => gc[key] || null);
  }
};
