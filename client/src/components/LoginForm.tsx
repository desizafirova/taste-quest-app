import axios from 'axios';
import { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<string>('');

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
      .then((res) => {
        console.log('Login response:', res.data);

        if (res.data.message) {
          setLoginStatus('Login successful!');
        } else {
          setLoginStatus('Unexpected response format.');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);

        if (error.response) {
          setLoginStatus(error.response.data.error || 'Login failed!');
        } else {
          setLoginStatus('Network error. Please try again.');
        }
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
      <p>{loginStatus || null}</p>
    </div>
  );
}

export default LoginForm;
