import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import styles from './Login.module.css';
import Button from '../components/Button';

function Login() {
  const [isOpenedReg, setIsOpenedReg] = useState<boolean>(false);
  return (
    <main className={styles.pageFlex}>
      <LoginForm />
      <h3 className={styles.heading}>
        Don't have an account yet?{' '}
        <Button
          textOnly={true}
          noBorder={true}
          onClick={() => setIsOpenedReg(true)}
        >
          Sign up
        </Button>
      </h3>
      {isOpenedReg && <RegistrationForm />}
    </main>
  );
}

export default Login;
