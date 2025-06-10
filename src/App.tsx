import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/configureStore";
import { autoLogin, login } from "./redux/login";

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(autoLogin());
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };
  return (
    <>
      <h2>Mini Dogs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>Entrar</button>
      </form>
    </>
  );
}

export default App;
