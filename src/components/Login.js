import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {
  // const proxy = 'https://cors-anywhere.herokuapp.com/';
  // const url = 'https://be-dad-jokes.herokuapp.com/api/auth/login';
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

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
        console.log(res);
        props.history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };
  console.log(credentials)
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
      </form>
    </>
  );
};

export default Login;
