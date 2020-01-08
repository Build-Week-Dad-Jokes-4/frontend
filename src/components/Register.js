import React, { useContext } from 'react';
import axios from 'axios';

// Contexts
import { LoginContext } from '../contexts/LoginContext';

const Register = props => {
  const { credentials, setCredentials } = useContext(LoginContext);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = e => {
    e.preventDefault();
    axios
      .post('https://be-dad-jokes.herokuapp.com/api/auth/register', credentials)
      .then(res => {
        console.log('Register', res);
        localStorage.setItem('token', res.data.password);
        localStorage.setItem('user_id', credentials.username);
        setCredentials({ username: '', password: '' });
        props.history.push('/jokelist');
      })
      .catch(err => console.log(err));
  };
  console.log(credentials);
  return (
    <>
      <h2>Register for an Account</h2>
      <form onSubmit={registerUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Create account</button>
      </form>
    </>
  );
};

export default Register;
