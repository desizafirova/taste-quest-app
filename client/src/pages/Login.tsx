import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import styles from './Login.module.css';

function Login() {
  return (
    <main className={styles.pageFlex}>
      <LoginForm />
      <h2 className={styles.heading}> OR...</h2>
      <RegistrationForm />
    </main>
  );
}

export default Login;
