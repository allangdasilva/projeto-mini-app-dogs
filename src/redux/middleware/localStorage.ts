const localStorage = (store) => (next) => (action) => {
  const result = next(action);
  const { meta } = action;
  if (meta && meta.localStorage) {
  }
};
export default localStorage;
