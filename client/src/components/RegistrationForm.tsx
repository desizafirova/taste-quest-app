import axios from 'axios';
import { useState } from 'react';
import styles from './RegistrationForm.module.css';

function RegistrationForm() {
  const [usernameReg, setUsernameReg] = useState<string>('');
  const [passwordReg, setPasswordReg] = useState<string>('');

  const register = () => {
    if (!usernameReg || !passwordReg) {
      console.log('Username and Password are required');
      return;
    }
    axios
      .post('http://localhost:3001/register', {
        username: usernameReg,
        password: passwordReg,
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.error('There was an error registering!', error);
      });
  };

  return (
    <div className={styles.regForm}>
      <h1>Registration</h1>
      <div className={styles.FlexInput}>
        <label>Username</label>
        <input
          type="text"
          value={usernameReg}
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
      </div>
      <div className={styles.FlexInput}>
        <label>Password</label>
        <input
          type="password"
          value={passwordReg}
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
      </div>
      <button onClick={register} className={styles.button}>
        Register
      </button>
    </div>
  );
}

export default RegistrationForm;
