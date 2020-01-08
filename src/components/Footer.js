import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

let Links = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 40%;
    
`;
 
export default function Footer (){
    return (        
        <footer>
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
        </footer>
        
    )
}