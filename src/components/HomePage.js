import React from "react";
import styled from 'styled-components';
import dadjoke from '../img/dadjokes.jpg'

let Title = styled.div`
    text-align: center;
`;

export default function WelcomePage() {
  return (
    <section className="welcome-page">
      <Title>
        <h1 className="mt-4">Check out the best Jokes EVAR!!</h1>
        <img className="mt-5" src={dadjoke} alt=""/>
      </Title>
    </section>
  );
}
