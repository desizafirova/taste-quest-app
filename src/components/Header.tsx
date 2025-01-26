import Navigation from './Navigation';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.headerPosition}>
      <Navigation />
    </header>
  );
}

export default Header;
