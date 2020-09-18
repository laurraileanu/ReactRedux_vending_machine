import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Control from "./Control/Control";

const Controls = (props) => {
  const keys = props.keypad.map((key) => (
    <Col xs={4} key={`key=${key.id}`} className="mb-3">
      <Control
        name={key.firstL}
        disabled={props.balance === 0}
        click={() => props.onPress(key.firstL)}
      />
    </Col>
  ));

  return (
    <Row>
      {keys}
      <Col xs={6} className="mt-4">
        <Button variant="danger" block onClick={props.cancel}>
          Cancel
        </Button>
      </Col>
      <Col xs={6} className="mt-4">
        <Button variant="success" block onClick={props.buy}>
          Buy
        </Button>
      </Col>
    </Row>
  );
};

export default Controls;
