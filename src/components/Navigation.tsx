import Button from './Button';
import Logo from './Logo';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav>
      <div className={styles.flexNav}>
        <div>
          <Logo />
        </div>

        <ul className={styles.flexUl}>
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
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
