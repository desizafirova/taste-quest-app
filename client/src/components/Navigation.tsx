import axios from 'axios';
import { useLogin } from '../contexts/LoginContext';
import Button from './Button';
import Logo from './Logo';
import styles from './Navigation.module.css';

function Navigation() {
  const { loginStatus, setLoginStatus } = useLogin();

  const logout = () => {
    axios
      .post('http://localhost:3001/logout', {}, { withCredentials: true })
      .then((response) => {
        console.log(response.data.message);
        setLoginStatus(false);
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <nav>
      <div className={styles.flexNav}>
        <div>
          <Logo />
        </div>

        <ul className={styles.flexUl}>
          <div className={styles.flex}>
            <li>
              <Button textOnly={true} href="/">
                Home
              </Button>
            </li>
            <li>
              <Button textOnly={true} href="/ourmission">
                Our Mission
              </Button>
            </li>
            <li>
              <Button textOnly={true} href="/recipes">
                Recipes
              </Button>
            </li>
          </div>
          <li>
            {loginStatus ? (
              <Button textOnly={true} onClick={logout} href="/">
                Logout
              </Button>
            ) : (
              <Button textOnly={true} href="/login">
                Login
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
