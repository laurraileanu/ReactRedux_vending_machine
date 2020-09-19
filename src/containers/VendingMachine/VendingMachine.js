import React, { Component } from "react";
import Panel from "components/Panel/Panel";
import { Row, Col } from "react-bootstrap";
import Display from "components/Display/Display";
import BalanceHolder from "components/BalanceHolder/BalanceHolder";
import Controls from "components/Controls/Controls";

import { connect } from "react-redux";
import * as actionCreators from "store/actions/reducerActions";

class VendingMachine extends Component {
  state = {
    keyCombination: [],
    amountInput: "",
    feedback: {
      message: null,
      type: "",
    },
  };

  // handle amount input change
  handleAmountChange = (event) => {
    this.setState({ amountInput: event.target.value });
  };

  // handle submit amount form
  addAmountHandler = (event) => {
    event.preventDefault();
    const value = parseInt(this.state.amountInput);

    this.props.onAddAmount(value);
    this.setState({ amountInput: "" });
  };

  // handle the combination from unlocked controls
  handleKeyCombination = (key) => {
    if (this.state.keyCombination.length > 1) return false; //if the combination has more than 2 chars stop pushing keys into array

    const result = [...this.state.keyCombination];
    result.push(key);

    this.setState({
      keyCombination: result,
    });
  };

  // handle the buy method
  handleBuy = () => {
    const combination = this.state.keyCombination.join("");
    // check if the combination has a coresponding product

    // get the index of updated product
    const indexOfUpdatedProduct = this.props.items.findIndex(
      (item) => item.keyCode === combination
    );
    //the to be updated product
    const product = this.props.items[indexOfUpdatedProduct];

    if (!!product) {
      //if it has a coresponding product procede with updating balance and qtti

      //check if the product has enough quantity
      if (product.qtty > 0) {
        //check if you have enough balance for buying the chosen product
        if (this.props.balance >= product.price) {
          this.props.onSubtractAmount(product.price);
          this.props.onUpdateIems(indexOfUpdatedProduct);
          this.setState({
            feedback: {
              message: `You have successfully purchased ${product.name}`,
              type: "success",
            },
            keyCombination: [],
          });
        } else {
          // if not enough balance display feedback
          this.setState({
            feedback: {
              message: `Insert ${
                product.price - this.props.balance
              }$ more to buy ${product.name}`,
              type: "danger",
            },
          });
        }
      } else {
        // if not enough qtti display feedback
        this.setState({
          feedback: {
            message: `The product is out of stock! select another one`,
            type: "danger",
          },
          keyCombination: [],
        });
      }
    } else {
      // if no coresponding product, show error feedback
      this.setState({
        feedback: {
          message: `${combination} - is not a valid code, try another one`,
          type: "danger",
        },
        keyCombination: [],
      });
    }
  };

  render() {
    return (
      <div className="bg-primary p-5 border rounded">
        <Row>
          <Col lg={8}>
            <Panel items={this.props.items} />
          </Col>
          <Col lg={4}>
            <Display
              feedback={this.state.feedback}
              combination={this.state.keyCombination.join("")}
              balance={this.props.balance}
            />
            <BalanceHolder
              changeInputValue={this.handleAmountChange}
              inputValue={this.state.amountInput}
              addAmount={this.addAmountHandler}
            />
            <Controls
              cancel={() => this.setState({ keyCombination: [] })}
              buy={this.handleBuy}
              onPress={this.handleKeyCombination}
              balance={this.props.balance}
              keypad={this.props.keypad}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    keypad: state.keypad,
    balance: state.balance,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAmount: (value) => dispatch(actionCreators.add(value)),
    onSubtractAmount: (value) => dispatch(actionCreators.substract(value)),
    onUpdateIems: (productIndex) =>
      dispatch(actionCreators.updateItems(productIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
