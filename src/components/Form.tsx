import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/configureStore";
import { login } from "../redux/login";
import style from "./Form.module.css";

function Form() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={style.label} htmlFor="username">
            Usuário
          </label>
          <input
            className={style.input}
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label className={style.label} htmlFor="password">
            Senha
          </label>
          <input
            className={style.input}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className={style.button}>Entrar</button>
      </form>
    </>
  );
}
export default Form;
