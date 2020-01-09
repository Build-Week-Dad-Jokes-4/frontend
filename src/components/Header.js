import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

let Links = styled.div`
    display: flex;
    justify-content: space-around;
    let Headers = styled.header;
    
    
`;
let Headers = styled.header`
    background-color: #A24558;
    padding-top: 5%;
    a{
      text-decoration: none;
      color: white;
    }
    
`;

let Text = styled.div`

    
    
`;

const Header = () => {
  return (
    <Headers className="ui centered">        
    <Links className='links'>
      <Text className='link'>
        <Link to ="/">Home</Link>
      </Text>
      <Text className='link'>
        <Link to="/Contact">Contact</Link>
      </Text>
      <Text className='link'>
          <Link to= "/login">Login</Link>
      </Text>
      <Text className='link'>
          <Link to= "/Jokes">Jokes</Link>
      </Text>
      <Text className='link'>
          <Link to= "/jokelist">Full List</Link>
      </Text>      <Text className='link'>
          <Link to= "/register">Register Now</Link>
      </Text>
    </Links>
  </Headers>
  )
}

export default Header;
