import { useNavigate } from 'react-router';
import Button from '../components/Button';
import styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.flexMessageBox}>
        <h1>Page not found</h1>
        <div className={styles.btnDiv}>
          <Button textOnly={false} onClick={() => navigate(-1)}>
            &larr; Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
