import React,{useState} from 'react';
import logo from '../logo.svg';
import styled from 'styled-components';

let Box = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    margin-left: 30%;
    border: 5px solid black;
    background-color: #DFBC82;
    button {
        width: 50%
        margin-left: 25%
    }
`;



export default function Card (props) {

    const [toggle, setToggle] = useState(true);

    

    const clickHandler = () =>{
        console.log(props.punchline);
        setToggle(!toggle);
        console.log(toggle);
        return setToggle;
    };

    return(
        <Box className = "Body">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{props.joke}</h3>
        <button type = 'button' onClick = {clickHandler}>{toggle ? 'click for answer': props.punchline}</button>
        </Box>
    )
}