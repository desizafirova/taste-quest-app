import axios from 'axios';
import { useLogin } from '../contexts/LoginContext';
import Button from './Button';
import Logo from './Logo';
import styles from './Navigation.module.css';
import { FaRegHeart } from 'react-icons/fa6';
import { IconContext } from 'react-icons';

function Navigation() {
  const { loginStatus, setLoginStatus } = useLogin();

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:3001/logout',
        {},
        { withCredentials: true }
      );
      setLoginStatus(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
          <div className={styles.logginRelatedButtons}>
            {loginStatus && (
              <li>
                <Button textOnly={true} href="/favourites">
                  <IconContext.Provider
                    value={{
                      color: '#2a3d45',
                      className: 'react-icons',
                      size: '2rem',
                    }}
                  >
                    <FaRegHeart />
                  </IconContext.Provider>
                </Button>
              </li>
            )}
            <li>
              {loginStatus ? (
                <Button textOnly={true} onClick={logout} href="/">
                  Logout
                </Button>
              ) : (
                <Button textOnly={false} href="/login">
                  Login
                </Button>
              )}
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
