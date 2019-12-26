import React, { Fragment, useState } from "react";
import CustomerRow from "./CustomerRow";
import CustomerView from "../customers/CustomerView";

const CustomerList = props => {
  const [selectedCustomer, setSelectedCustomer] = useState();
  return selectedCustomer ? (
    <CustomerView
      customer={selectedCustomer}
      onClose={() => setSelectedCustomer(null)}
    />
  ) : (
    <Fragment>
      <button
        className="btn btn-sm btn-primary float-right m-2"
        onClick={() => {
          props.openForm();
        }}
      >
        Add New
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Company Name</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data && props.data.customers ? (
            props.data.customers.map(item => (
              <CustomerRow
                key={item.id}
                data={item}
                onView={() => setSelectedCustomer(item)}
              />
            ))
          ) : (
            <tr>
              <td> there is no record </td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default CustomerList;
