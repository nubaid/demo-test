import React from "react";

const CustomerRow = props => {
  const {
    id,
    firstName,
    lastName,
    email,
    companyName,
    address,
    city,
    state,
    zip = "test"
  } = props.data;
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{companyName}</td>
      <td>
        {address}
        <br />
        {city} - {state}, {zip}
      </td>
      <td>
        <button
          onClick={e => {
            e.preventDefault();
            props.onView();
          }}
          title="View"
          className="btn btn-outline-primary mr-1"
        >
          <i className="fa fa-eye" />
        </button>
      </td>
    </tr>
  );
};

export default CustomerRow;
