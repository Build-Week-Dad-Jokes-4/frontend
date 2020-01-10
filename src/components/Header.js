import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

let Links = styled.div`
    display: flex;
    justify-content: space-around;
`;
let Headers = styled.header`
    background-color: #A24558;
    padding-top: 5%;
    a{
      text-decoration: none;
      color: white;
    }
 `;



const Header = () => {
  return (
    <Headers className="ui centered">        
    <Links className='links'>
      <div className='link'>
        <Link to ="/">Home</Link>
      </div>
      <div className='link'>
        <Link to="/Contact">Contact</Link>
      </div>
      <div className='link'>
          <Link to= "/login">Login</Link>
      </div>
      <div className='link'>
          <Link to= "/Jokes">Jokes</Link>
      </div>
      <div className='link'>
          <Link to= "/jokelist">Full List (Registered-users)</Link>
      </div>      <div className='link'>
          <Link to= "/register">Register Now</Link>
      </div>
    </Links>
  </Headers>
  )
}

export default Header;
