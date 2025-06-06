import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducers from "./login";

const reducer = combineReducers({ reducers });
const store = configureStore({ reducer: reducer });

export default store;
