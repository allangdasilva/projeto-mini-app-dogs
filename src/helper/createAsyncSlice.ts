import { createSlice } from "@reduxjs/toolkit";

interface InitialState<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}
interface SliceConfig<T, A = any> {
  name: string;
  fetchConfig: (payload: A) => {
    url: string;
    options?: RequestInit;
  };
  initialState?: Partial<InitialState<T>>;
  reducers?: Record<string, any>;
}

const createAsyncSlice = <T, A = any>(config: SliceConfig<T, A>) => {
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
  return { ...slice };
};

export default createAsyncSlice;
