import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLogin } from '../contexts/LoginContext';
import styles from './LoginForm.module.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setLoginStatus, checkLoginStatus } = useLogin();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const login = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        { username, password },
        { withCredentials: true } // ✅ Send credentials (cookies) to the server
      );

      if (response.data.auth) {
        setLoginStatus(true);

        await checkLoginStatus(); // Check auth status after login
        navigate('/');
      } else {
        setLoginStatus(false);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await checkLoginStatus();
      } else {
        setLoginStatus(false);
      }
    };

    verifyToken();
  }, []);

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
      <Button onClick={login} textOnly={false}>
        Login
      </Button>
    </div>
  );
}

export default LoginForm;
