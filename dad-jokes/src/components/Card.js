import React from 'react';
import logo from '../logo.svg';

export default function Card () {
    return(
        <div className = "Body">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Random dad Joke</h3>
        <p>random dad joke answer</p>
        </div>
    )
}