import React from "react";
import style from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/configureStore";
import { userLogout } from "../redux/login";

const Header = () => {
  const { token, user } = useSelector((state: RootState) => state.reducers);
  const loading = token.loading || user.loading;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className={style.header}>
      <h1 className={style.title}>Mini Dogs</h1>
      <button
        aria-label="Logout"
        onClick={() => dispatch(userLogout())}
        className={`${style.login}
           ${loading ? style.loading : ""}
           ${user.data ? style.loaded : ""}
           `}
      ></button>
    </header>
  );
};

export default Header;
