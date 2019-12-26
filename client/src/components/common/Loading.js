import React from "react";

const Loading = props => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={props.small ? {} : { height: "calc(100vh - 100px)" }}
    >
      <i className="fa fa-spinner fa-spin fa-3x text-primary" />
    </div>
  );
};

export default Loading;
