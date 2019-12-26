const DataLoader = require("dataloader");
const { groupBy } = require("../../helpers/batchDataLoader");

// Create DataLoader instance by providing it our batch function
// and export it to make it available to other parts of the application
module.exports = models =>
  new DataLoader(keys => groupBy("customerId", keys, models.Order, "findAll"));
