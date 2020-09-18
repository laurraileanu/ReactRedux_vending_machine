import React from "react";
import classes from "./PanelItem.module.scss";

const PanelItem = (props) => {
  return (
    <div
      className={`
        d-inline-flex flex-column align-items-center justify-content-center text-center bg-light rounded p-2
        ${props.quantity === 0 ? classes.Disabled : "available"}
      `}
    >
      <strong>
        {props.name}
        <br />"{props.keyCode}"
      </strong>
      <span>{props.price} $</span>
      <small>cantitate ramasa: {props.quantity}</small>
    </div>
  );
};

export default PanelItem;
