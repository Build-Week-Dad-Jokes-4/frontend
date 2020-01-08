import React from "react";
import styled from 'styled-components';

let Title = styled.div`
    text-align: center;
`;

export default function WelcomePage() {
  return (
    <section className="welcome-page">
      <Title>
        <h1>Check out the best Jokes EVAR!!</h1>
      </Title>
    </section>
  );
}
