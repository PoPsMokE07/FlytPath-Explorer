import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Route";

const store = configureStore({
  reducer: rootReducer,
});

export default store;

