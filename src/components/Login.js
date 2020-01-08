import React, { useContext } from 'react';
import axios from 'axios';

// Contexts
import { LoginContext } from '../contexts/LoginContext';

const Login = props => {
  const { credentials, setCredentials } = useContext(LoginContext);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axios
      .post('https://be-dad-jokes.herokuapp.com/api/auth/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', credentials.username);
        setCredentials({ username: '', password: '' });
        props.history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h2>Welcome to the Login Page</h2>
      <form onSubmit={login}>
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
        <button>Login</button>
        {/* <div>
          <button>Need an account? Click here</button>
        </div> */}
      </form>
    </>
  );
};

export default Login;
