import React from "react";
import { Row, Col } from "react-bootstrap";
import PanelItem from "./PanelItem/PanelItem";

const Panel = (props) => {
  const items = props.items.map((item, index) => (
    <Col
      xs={4}
      key={`item-${index}`}
      className="my-3 d-flex justify-content-center"
    >
      <PanelItem
        name={item.name}
        price={item.price}
        quantity={item.qtty}
        keyCode={item.keyCode}
      />
    </Col>
  ));

  return (
    <div className="bg-dark rounded h-100">
      <Row>{items}</Row>
    </div>
  );
};

export default Panel;
