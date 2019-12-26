import React, { Fragment, useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import CustomerList from "../components/customers/CustomerList";
import CustomerForm from "../components/customers/CustomerForm";
import Loading from "../components/common/Loading";
import { GET_CUSTOMERS_QUERY } from "../graphql/queries";
import { CREATE_CUSTOMER_MUTATION } from "../graphql/mutations";

const CustomerContainer = props => {
  const defaultValues = {
    id: 0,
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    companyName: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  };
  const [customer, setCustomer] = useState(defaultValues);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentMode, setPaymentMode] = useState("cash");
  const [viewMode, setViewMode] = useState(true);
  const [alertMsg, setAlertMsg] = useState({ type: "info", msg: "" });
  // get the customer data
  const [fetchCustomers, { error, loading, data }] = useLazyQuery(
    GET_CUSTOMERS_QUERY
  );
  const { id, __typename, createdAt, updatedAt, ...CustomerInput } = customer;

  // create customer mutation for new customer
  let [saveMutation, { error: customerErr }] = useMutation(
    CREATE_CUSTOMER_MUTATION,
    {
      variables: { input: { ...CustomerInput, paymentMode, selectedProducts } },
      update: (cache, { data: customerData }) => {
        setAlertMsg({
          type: "success",
          msg: "Customer saved successfully"
        });
        fetchCustomers();
      },
      onError: customerErr => {
        setAlertMsg({
          type: "danger",
          msg: "Error while saving customer"
        });
        console.log(
          customerErr.message.substring(customerErr.message.indexOf(":") + 1)
        );
      }
    }
  );
  useEffect(() => {
    fetchCustomers();
  }, []);

  if (error) return error;
  if (loading) return <Loading />;
  console.log("data", data);

  return (
    <div className="p-4">
      {alertMsg.msg ? (
        <div className={`alert-${alertMsg.type}`}>{alertMsg.msg}</div>
      ) : null}
      {viewMode ? (
        <CustomerList data={data} openForm={() => setViewMode(false)} />
      ) : (
        <CustomerForm
          onSave={e => {
            e.preventDefault();
            saveMutation();
          }}
          onCancel={() => setViewMode(true)}
          customer={customer}
          setCustomer={setCustomer}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
        />
      )}
    </div>
  );
};

export default CustomerContainer;
