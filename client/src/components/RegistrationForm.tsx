import axios from 'axios';
import { useState } from 'react';

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
    <div>
      <h1>Registration</h1>
      <label>Username</label>
      <input
        type="text"
        value={usernameReg}
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        value={passwordReg}
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default RegistrationForm;
