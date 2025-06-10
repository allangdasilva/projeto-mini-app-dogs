import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducers from "./login";
import localStorage from "./middleware/localStorage";

const reducer = combineReducers({ reducers });
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorage),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
