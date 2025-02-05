import axios from 'axios';
import { useState } from 'react';
import { useLogin } from '../contexts/LoginContext';
import styles from './LoginForm.module.css';
import Button from './Button';
import { useNavigate } from 'react-router';

function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setLoginStatus } = useLogin();
  const navigate = useNavigate();

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
          navigate('/');
        }
      });
  };

  // const isUserAuthenticated = () => {
  //   axios
  //     .get('http://localhost:3001/isUserAuth', {
  //       headers: {
  //         'x-access-token': localStorage.getItem('token'),
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  return (
    <div className={styles.loginForm}>
      <h1>Login</h1>
      <div className={styles.FlexInput}>
        <label id="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={styles.FlexInput}>
        <label id="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Button onClick={login} className={styles.button} textOnly={false}>
        Login
      </Button>
      {/* {loginStatus && (
        <button onClick={isUserAuthenticated}>
          Check whether you are authenticated
        </button>
      )} */}
    </div>
  );
}

export default LoginForm;
