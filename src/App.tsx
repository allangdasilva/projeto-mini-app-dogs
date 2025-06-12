import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/configureStore";
import { autoLogin } from "./redux/login";
import Header from "./components/Header";
import "./App.css";
import Content from "./components/Content";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <Header />
        <Content />
      </div>
    </>
  );
}

export default App;
