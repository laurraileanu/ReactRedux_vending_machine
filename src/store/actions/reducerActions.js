import * as actionTypes from "./actionTypes";

export const add = (value) => {
  return {
    type: actionTypes.ADD,
    payload: value,
  };
};

export const substract = (value) => {
  return {
    type: actionTypes.SUBTRACT,
    payload: value,
  };
};

export const updateItems = (index) => {
  return {
    type: actionTypes.UPDATE_ITEMS,
    payload: index,
  };
};
