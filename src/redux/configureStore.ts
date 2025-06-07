import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducers from "./login";

const reducer = combineReducers({ reducers });
const store = configureStore({ reducer: reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
