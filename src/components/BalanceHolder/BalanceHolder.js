import React from "react";
import { Button, Col, Form } from "react-bootstrap";

const BalanceHolder = (props) => {
  return (
    <Form onSubmit={props.addAmount}>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            required
            type="number"
            value={props.inputValue}
            placeholder="insert money (number)"
            onChange={props.changeInputValue}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Button type="submit" variant="success" block>
            Add Money
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default BalanceHolder;
