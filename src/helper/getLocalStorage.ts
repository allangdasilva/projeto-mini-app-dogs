function getLocalStorage(key: string, value: null) {
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
}
export default getLocalStorage;
