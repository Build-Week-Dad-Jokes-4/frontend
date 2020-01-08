import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
    return (
      <header className="ui centered">
        
        <div className='links'>
          <div className='link'>
            <Link to ="/">Home</Link>
          </div>
          <div className='link'>
            <Link to="/Contact">Contact</Link>
          </div>
          <div className='link'>
              <Link to= "/Login">Login</Link>
          </div>
          <div className='link'>
              <Link to= "/Jokes">Jokes</Link>
          </div>
        </div>
      </header>
    );
  }
  