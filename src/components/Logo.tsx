import Button from './Button';
import styles from './Logo.module.css';

function Logo() {
  return (
    <Button href="/">
      <img src="./vite.svg" alt="Website's logo" className={styles.img} />
    </Button>
  );
}

export default Logo;
