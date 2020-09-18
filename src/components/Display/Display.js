import React from "react";
import { Alert } from "react-bootstrap";

const Display = (props) => {
  const walletMessage =
    props.balance > 0 ? (
      <p>Please select your product:</p>
    ) : (
      <Alert variant="danger">Insert Money!</Alert>
    );

  return (
    <div className="bg-warning p-4 rounded mb-4">
      <p>
        Your ballance is: <b>{props.balance} $</b>
      </p>
      {walletMessage}
      {props.feedback.message && (
        <Alert variant={props.feedback.type}>{props.feedback.message}</Alert>
      )}
      {props.combination}
    </div>
  );
};

export default Display;
