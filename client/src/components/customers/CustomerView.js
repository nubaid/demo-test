import React, { Fragment } from "react";

const CustomerView = props => {
  const {
    image,
    id,
    address,
    city,
    state,
    zip,
    companyName,
    firstName,
    lastName,
    email,
    orders
  } = props.customer;
  const { items, paymentMode, totalCharges } =
    orders && orders.length > 0
      ? orders[0]
      : {
          items: [],
          paymentMode: "",
          totalCharges: 0
        };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="dl-skin">
            <img
              src={image ? `/assets/customers/${id}/${image}` : ""}
              height="120"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 ">
          <p>
            {address},<br /> {city},<br /> {`${state}, ${zip}`}
          </p>
        </div>

        <div className="col-md-4 text-md-right ml-auto">
          <p>
            {companyName}
            <br />
            {`${firstName} ${lastName}`}
            <br />
            {email}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 head-title">
          <h4>Payment Method</h4>
        </div>
        <div className="col-md-4 head-title text-md-right ml-auto">
          <h4>Check#</h4>
        </div>
        <div className="col-md-8">
          <span>{paymentMode}</span>
        </div>
        <div className="col-md-4 text-md-right ml-auto">
          <span />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 head-title">
          <h4>Item</h4>
        </div>
        <div className="col-md-4 head-title text-md-right ml-auto">
          <h4>Price</h4>
        </div>
        {items.map((it, i) => {
          return (
            <Fragment>
              <div key={i + items} className="col-md-8">
                <span>{`${it.product.title} (${it.quantity} x $${it.product.price})`}</span>
              </div>
              <div className="col-md-4 text-md-right ml-auto">
                <span>${it.amount}</span>
              </div>
            </Fragment>
          );
        })}
      </div>
      <hr />
      <div className="col-md-3 text-md-right ml-auto">
        <h4>
          Total: <b> {`$${totalCharges}`} </b>
        </h4>
      </div>
      <button
        className="btn btn-secondary ml-auto"
        onClick={() => props.onClose()}
      >
        Close
      </button>
    </div>
  );
};

export default CustomerView;
