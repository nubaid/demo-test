import React, { useState } from "react";
import _ from "lodash";
const uploadDir = "../../../assets/uploads/";

const products = [
  {
    id: 1,
    title: "Website Design",
    price: 300
  },
  {
    id: 2,
    title: "Logo Design",
    price: 200
  },
  {
    id: 3,
    title: "Hosting charge",
    price: 45
  }
];

const paymentModes = ["cash", "cheque", "card"];

const CustomerForm = props => {
  let {
    id,
    firstName,
    lastName,
    image,
    email,
    companyName,
    city,
    state,
    zip,
    address
  } = props.customer;
  const [productInput, setProductInput] = useState({ quantity: 1 });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleFileChange = (e, name) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      props.setCustomer({ ...props.customer, image: file });
    };
    reader.readAsDataURL(file);
  };

  let imagePreviewElement = null;

  if (imagePreviewUrl) {
    imagePreviewElement = (
      <img
        src={imagePreviewUrl}
        style={{
          maxHeight: 160,
          maxWidth: 160,
          display: "block",
          margin: "auto"
        }}
      />
    );
  }

  const handleFormField = ({ target }) => {
    props.setCustomer({
      ...props.customer,
      [target.name]: target.value
    });
  };

  const handleProductInputChange = ({ target }) => {
    console.log("value ", target.value);
    if (target.name === "product") {
      setProductInput({
        ...productInput,
        [target.name]: products.find(it => it.id === +target.value)
      });
    } else {
      setProductInput({
        ...productInput,
        [target.name]: +target.value
      });
    }
  };

  const addProduct = () => {
    if (productInput) {
      props.setSelectedProducts([
        ...props.selectedProducts,
        {
          ...productInput,
          amount: Number(
            productInput.product.price * productInput.quantity
          ).toFixed(2)
        }
      ]);
      setProductInput({});
    }
  };

  console.log("selectedProducts ", props.selectedProducts);

  return (
    <div className="container container-bg">
      <div
        style={{
          border: "1px solid #efefef",
          padding: "0 1em",
          marginTop: "1em"
        }}
      >
        <div className="row">
          <div className="col-12 bg-info text-center p-2 text-capitalize">
            Add Customer
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 pt-3">
            {imagePreviewElement}
            <div className="upload-file mt-1">
              <label>
                <input
                  name="image"
                  className="image-browse-dn"
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e)}
                  placeholder="image"
                />
                Browse Image
              </label>
            </div>
          </div>
          <div className="col-md-8 ml-auto">
            <div className="add-vehicle-form">
              <form>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label> First Name </label>
                    <input
                      name="firstName"
                      value={firstName}
                      onChange={handleFormField}
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label> Last Name </label>
                    <input
                      className="form-control"
                      name="lastName"
                      value={lastName}
                      onChange={handleFormField}
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label> Company Name</label>
                    <input
                      name="companyName"
                      value={companyName}
                      onChange={handleFormField}
                      type="text"
                      className="form-control"
                      placeholder="Company"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label> Email </label>
                    <input
                      name="email"
                      value={email}
                      onChange={handleFormField}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label> Address </label>
                    <input
                      label="Address"
                      name="address"
                      value={address}
                      className="form-control"
                      onChange={handleFormField}
                      type="text"
                      placeholder="Address"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label> City </label>
                    <input
                      name="city"
                      value={city}
                      onChange={handleFormField}
                      type="text"
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label> State </label>
                    <input
                      name="state"
                      value={state}
                      onChange={handleFormField}
                      type="text"
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label> Zip </label>
                    <input
                      name="zip"
                      value={zip}
                      onChange={handleFormField}
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                    />
                  </div>
                  <div className="form-group col-sm-4">
                    <label> Product </label>
                    <select
                      className="form-control"
                      name="product"
                      value={productInput.product ? productInput.product.id : 0}
                      onChange={handleProductInputChange}
                    >
                      <option value="0">Select Product</option>
                      {products.map(it => (
                        <option
                          key={it.id}
                          value={it.id}
                        >{`${it.title} ($${it.price})`}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-sm-4">
                    <label> Quantity </label>
                    <input
                      name="quantity"
                      value={productInput.quantity || 1}
                      onChange={handleProductInputChange}
                      type="number"
                      className="form-control"
                      placeholder="quantity"
                      step="1"
                      min="1"
                    />
                  </div>
                  <div className="col-4">
                    <label> </label>
                    <button
                      className="btn btn-block btn-outline-secondary btn-sm mt-2"
                      disabled={
                        _.isEmpty(productInput) ||
                        +productInput.quantity < 1 ||
                        !productInput.product
                      }
                      onClick={e => {
                        e.preventDefault();
                        addProduct();
                      }}
                    >
                      Add Product
                    </button>
                  </div>
                  <div className="col-12">
                    <table className="table table-striped w-100">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.selectedProducts.map((it, i) => (
                          <tr key={i}>
                            <td>{`${it.product.title} $(${it.product.price})`}</td>
                            <td>{it.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="form-group col-sm-4">
                    <label> Payment Mode </label>
                    <select
                      className="form-control"
                      name="paymentMode"
                      value={props.paymentMode}
                      onChange={() => props.setPaymentMode()}
                    >
                      <option value="0">Select Payment Mode</option>
                      {paymentModes.map(it => (
                        <option key={it} value={it}>
                          {it}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-sm-4 ml-auto">
                    <label>Total Amount</label>
                    <br />
                    <div>
                      {props.selectedProducts.reduce(
                        (acc, cr) => (+acc || 0) + +cr.amount,
                        0
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 ml-auto text-md-right">
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={props.onSave}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={props.onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
