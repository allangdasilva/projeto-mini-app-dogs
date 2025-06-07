import { combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "../helper/createAsyncSlice";

const token = createAsyncSlice({
  name: "token",
  fetchConfig: (payload) => ({
    url: "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  }),
});
const user = createAsyncSlice({
  name: "user",
  fetchConfig: (payload) => ({
    url: "https://dogsapi.origamid.dev/json/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + payload,
      },
    },
  }),
});
const reducers = combineReducers({ token: token.reducer, user: user.reducer });
export default reducers;
