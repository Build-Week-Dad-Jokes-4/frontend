import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <ul>
      DadJokes 4.0
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/jokelist">List of Jokes</Link>
    </ul>
  )
}

export default Header;
