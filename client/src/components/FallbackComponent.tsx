import { useNavigate } from 'react-router';
import Button from './Button';
import styles from './FallbackComponent.module.css';

function FallbackComponent() {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.flexMessageBox}>
        <h1>Something went wrong</h1>
        <div className={styles.btnDiv}>
          <Button textOnly={false} onClick={() => navigate(-1)}>
            &larr; Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FallbackComponent;
