import axios from 'axios';
import { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState(false);

  axios.defaults.withCredentials = true;

  const login = () => {
    axios
      .post('http://localhost:3001/login', {
        username,
        password,
      })
      .then((response) => {
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          localStorage.setItem('token', response.data.token);
          setLoginStatus(true);
        }
      });
  };

  const isUserAuthenticated = () => {
    axios
      .get('http://localhost:3001/isUserAuth', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <label id="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label id="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={login}>Login</button>
      {loginStatus && (
        <button onClick={isUserAuthenticated}>
          Check whether you are authenticated
        </button>
      )}
    </div>
  );
}

export default LoginForm;
