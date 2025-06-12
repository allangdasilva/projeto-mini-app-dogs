import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/configureStore";
import { autoLogin } from "./redux/login";
import Form from "./components/Form";
import Photos from "./components/Photos";
import Header from "./components/Header";
import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.reducers.user);

  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <Header />
        {data ? <Photos /> : <Form />}
      </div>
    </>
  );
}

export default App;
