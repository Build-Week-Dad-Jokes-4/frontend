import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <ul>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </ul>
  )
}

export default Header;
