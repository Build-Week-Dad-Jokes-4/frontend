import React, { useState } from 'react';
import axios from 'axios';

const Register = props => {
  const [register, setRegister] = useState({
    username: '',
    password: '',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  });

  const handleChange = e => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = e => {
    e.preventDefault();
    axios
      .post('https://be-dad-jokes.herokuapp.com/api/auth/register', register)
      .then(res => {
        console.log('Register', res);
        localStorage.setItem('token', res.data.password);
        props.history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };
  console.log(register);
  return (
    <>
      <h2>Register for Account</h2>
      <form onSubmit={registerUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={register.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={register.password}
          onChange={handleChange}
        />
        <button>Create account</button>
      </form>
    </>
  );
};

export default Register;
