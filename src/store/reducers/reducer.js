import * as actionTypes from "../actions/actionTypes";

const initialState = {
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case actionTypes.SUBTRACT:
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case actionTypes.UPDATE_ITEMS:
      const updatedItems = [...state.items];
      // make a copy of the product
      const updatedProduct = { ...state.items[action.payload] };
      // update imutably the qtti and the items copy

      updatedProduct.qtty = state.items[action.payload].qtty - 1;
      updatedItems[action.payload] = updatedProduct;

      return {
        ...state,
        items: updatedItems,
      };
  }
  return state;
};

export default reducer;
