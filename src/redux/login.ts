import { combineReducers, type PayloadAction } from "@reduxjs/toolkit";
import createAsyncSlice, {
  type InitialState,
} from "../helper/createAsyncSlice";
import type { AppDispatch, RootState } from "./configureStore";
import getLocalStorage from "../helper/getLocalStorage";
import photos from "./photos";

export interface LoginPayload {
  username: string;
  password: string;
}
interface TokenResponse {
  token: string;
}
interface UserResponse {
  email: string;
  id: number;
  nome: string;
  username: string;
}

const token = createAsyncSlice<TokenResponse, LoginPayload>({
  name: "token",
  initialState: {
    data: {
      token: getLocalStorage("token", null),
    },
  },
  reducers: {
    fetchSuccess: {
      reducer(
        state: InitialState<TokenResponse>,
        action: PayloadAction<TokenResponse>
      ) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload: TokenResponse) {
        return {
          payload,
          meta: { localStorage: { key: "token", value: payload.token } },
        };
      },
    },
  },
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
const user = createAsyncSlice<UserResponse, string>({
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
const fetchToken = token.asyncAction;
const fetchUser = user.asyncAction;

export const login = (user: LoginPayload) => async (dispatch: AppDispatch) => {
  try {
    const { payload } = (await dispatch(
      fetchToken(user)
    )) as PayloadAction<TokenResponse>;
    if (payload.token !== undefined) await dispatch(fetchUser(payload.token));
  } catch (error) {
    if (error instanceof Error) throw new Error(`Erro: ${error.message}`);
  }
};

const reducers = combineReducers({
  token: token.reducer,
  user: user.reducer,
  photos: photos.reducer,
});

export const autoLogin =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (state.reducers.token.data) {
      const { token } = state.reducers.token.data;
      if (token) await dispatch(fetchUser(token));
    }
  };
export default reducers;
