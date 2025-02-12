import Button from './Button';
import styles from './Logo.module.css';

function Logo() {
  return (
    <Button textOnly={true} href="/" noBorder={true}>
      <img src="/logo.png" alt="Website's logo" className={styles.img} />
    </Button>
  );
}

export default Logo;
