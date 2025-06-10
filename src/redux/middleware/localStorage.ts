import type { Middleware } from "@reduxjs/toolkit";

interface MetaResponse {
  localStorage: {
    key: string;
    value: string;
  };
}

const localStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const { meta } = action as {
    type: string;
    payload?: {};
    meta?: MetaResponse;
  };
  if (store && meta && meta.localStorage) {
    const { key, value } = meta.localStorage;
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  return result;
};
export default localStorage;
