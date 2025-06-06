import { combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "../helper/createAsyncSlice";

const token = createAsyncSlice({
  name: "token",
});
const user = createAsyncSlice({
  name: "user",
});
const reducers = combineReducers({ token: token.reducer, user: user.reducer });
export default reducers;
