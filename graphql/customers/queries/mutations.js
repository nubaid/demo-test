const { upload, createUploadFilename } = require("../../../upload");
const fs = require("fs-extra");

module.exports = {
  createCustomer: async (
    source,
    { input },
    { models: { Customer, Order } }
  ) => {
    try {
      const { paymentMode, selectedProducts, ...customerInput } = input;
      let customer = null;
      const { filename } = await customerInput.image;
      const uploadFilename = createUploadFilename("image", filename);

      // insert customer to db
      customer = await Customer.create({
        ...customerInput,
        image: uploadFilename
      });

      // if image exists then upload to temp
      if (customerInput.image) {
        await upload(customerInput.image, uploadFilename, customer.id);
      }
      let order = null;
      if (customer) {
        order = await Order.create({
          customerId: +customer.id,
          items: selectedProducts,
          paymentMode,
          totalCharges: selectedProducts.reduce(
            (acc, cr) => (+acc || 0) + +cr.amount,
            0
          )
        });
      }

      if (order) return customer;
      else {
        throw new Error("Could not save Order and Customer");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
