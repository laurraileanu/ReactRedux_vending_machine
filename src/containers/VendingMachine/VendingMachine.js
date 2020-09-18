import React, { Component } from "react";
import Panel from "components/Panel/Panel";
import { Row, Col } from "react-bootstrap";
import Display from "components/Display/Display";
import BalanceHolder from "components/BalanceHolder/BalanceHolder";
import Controls from "components/Controls/Controls";

class VendingMachine extends Component {
  state = {
    keyCombination: [],
    amountInput: "",
    feedback: {
      message: null,
      type: "danger",
    },
    balance: 0,
    keypad: [
      {
        firstL: "A",
        id: 1,
      },
      {
        firstL: "B",
        id: 2,
      },
      {
        firstL: "C",
        id: 3,
      },
      {
        firstL: "1",
        id: 4,
      },
      {
        firstL: "2",
        id: 5,
      },
      {
        firstL: "3",
        id: 6,
      },
    ],
    items: [
      {
        keyCode: "A1",
        qtty: 8,
        price: 20,
        name: "Snickers",
      },
      {
        keyCode: "A2",
        qtty: 5,
        price: 15,
        name: "Bounty",
      },
      {
        keyCode: "A3",
        qtty: 10,
        price: 10,
        name: "Mars",
      },
      {
        keyCode: "B1",
        qtty: 2,
        price: 20,
        name: "Kit Kat",
      },
      {
        keyCode: "B2",
        qtty: 1,
        price: 75,
        name: "M&Ms",
      },
      {
        keyCode: "B3",
        qtty: 6,
        price: 22,
        name: "Coca Cola",
      },
      {
        keyCode: "C1",
        qtty: 0,
        price: 11,
        name: "Fanta",
      },
      {
        keyCode: "C2",
        qtty: 8,
        price: 32,
        name: "Sprite",
      },
      {
        keyCode: "C3",
        qtty: 8,
        price: 50,
        name: "Cola Zero",
      },
    ],
  };

  // handle amount input change
  handleAmountChange = (event) => {
    this.setState({ amountInput: event.target.value });
  };

  // handle submit amount form
  addAmountHandler = (event) => {
    event.preventDefault();
    const value = parseInt(this.state.amountInput);

    this.setState((prevState) => {
      return {
        balance: prevState.balance + value,
        amountInput: "",
      };
    });
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
    let validCombinations = [];
    this.state.items.forEach((item) => {
      const combination = item.keyCode;
      validCombinations.push(combination);
    });

    if (validCombinations.includes(combination)) {
      //if it has a coresponding product procede with updating balance and qtti
      const product = this.state.items.find(
        (item) => item.keyCode === combination
      );
      //check if the product has enough quantity
      if (product.qtty > 0) {
        //check if you have enough balance for buying the chosen product
        if (this.state.balance >= product.price) {
          const updatedItems = [...this.state.items];
          // get the index of updated product
          const indexOfUpdatedProduct = this.state.items.indexOf(product);
          // make a copy of the product
          const updatedProduct = { ...product };
          // update inmutably the qtti and the items copy
          updatedProduct.qtty = product.qtty - 1;
          updatedItems[indexOfUpdatedProduct] = updatedProduct;
          this.setState((prevState) => {
            return {
              balance: prevState.balance - product.price, //updating balance
              feedback: {
                message: `You have successfully purchased ${product.name}`,
                type: "success",
              },
              keyCombination: [],
              items: updatedItems,
            };
          });
        } else {
          // if not enough balance display feedback
          this.setState({
            feedback: {
              message: `Insert ${
                product.price - this.state.balance
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
            <Panel items={this.state.items} />
          </Col>
          <Col lg={4}>
            <Display
              feedback={this.state.feedback}
              combination={this.state.keyCombination.join("")}
              balance={this.state.balance}
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
              balance={this.state.balance}
              keypad={this.state.keypad}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default VendingMachine;
