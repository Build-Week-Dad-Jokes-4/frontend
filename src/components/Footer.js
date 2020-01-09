import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

let Links = styled.div`
    display: flex;
    justify-content: space-around;
    
    
`;
let Footers = styled.footer`
    background-color: #A24558;
    margin-top: 80%;   
    padding-top: 5%;
    
    a{
      text-decoration: none;
      color: white;
    }
    
`;
 
export default function Footer (){
    return (        
        <Footers>
            <Links className='links'>
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
            </Links>
        </Footers>
        
    )
}