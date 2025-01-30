import axios from 'axios';
import { useEffect, useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<string>('');

  axios.defaults.withCredentials = true;

  const login = () => {
    if (!username || !password) {
      console.log('Username and Password are required');
      setLoginStatus('Username and Password are required');
      return;
    }

    axios
      .post('http://localhost:3001/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/login').then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

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
      <p>{loginStatus || null}</p>
    </div>
  );
}

export default LoginForm;
