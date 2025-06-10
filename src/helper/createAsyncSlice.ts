import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../redux/configureStore";
import type { LoginPayload } from "../redux/login";

export interface InitialState<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}
interface SliceConfig<T, A = LoginPayload | string> {
  name: string;
  fetchConfig: (payload: A) => {
    url: string;
    options?: RequestInit;
  };
  initialState?: Partial<InitialState<T>>;
  reducers?: Record<string, any>;
}

const createAsyncSlice = <T, A = LoginPayload | string>(
  config: SliceConfig<T, A>
) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    } as InitialState<T>,
    reducers: {
      fetchStarted(state) {
        state.loading = true;
      },
      fetchSuccess(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError(state, action) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
    },
  });
  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

  const asyncAction = (payload: A) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchStarted());
      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const data = await response.json();
      return dispatch(fetchSuccess(data));
    } catch (error) {
      if (error instanceof Error) {
        return dispatch(fetchError(error.message));
      }
    }
  };
  return { ...slice, asyncAction };
};

export default createAsyncSlice;
