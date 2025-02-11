import Button from './Button';
import styles from './UserSideBar.module.css';

function UserSideBar() {
  return (
    <nav className={styles.userSideBar}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Button textOnly={true} noBorder={true}>
            My Recipes
          </Button>
        </li>
        <li className={styles.li}>
          <Button textOnly={true} noBorder={true}>
            Settings
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default UserSideBar;
