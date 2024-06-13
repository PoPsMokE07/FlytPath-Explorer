import { combineReducers } from "@reduxjs/toolkit";
const ADD_PATH = "ADD_PATH";
export const addPath = (path) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_PATH, payload: path });
    } catch (error) {
      console.error("Error adding path:", error);
    }
  };
};


const initialState = {
  paths: [],
};
const pathReducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_PATH: {
      return {
        ...state,
        paths: [...state.paths, action.payload],
      };
    }
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  path: pathReducer,
});
export default rootReducer;
