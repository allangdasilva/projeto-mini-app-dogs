import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/configureStore";
import { autoLogin } from "./redux/login";
import Form from "./components/form";
import Photos from "./components/Photos";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.reducers.user);

  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <>
      <h2>Mini Dogs</h2>

      {data ? <Photos /> : <Form />}
    </>
  );
}

export default App;
