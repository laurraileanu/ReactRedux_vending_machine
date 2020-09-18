import React from "react";
import { Button } from "react-bootstrap";

const Control = (props) => {
  return (
    <Button
      variant={"outline-light"}
      block
      disabled={props.disabled}
      onClick={props.click}
    >
      {props.name}
    </Button>
  );
};

export default Control;
