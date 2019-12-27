import React from 'react';

const Jokes = ({joke}) => {
  return (
    <>
      <div>{joke.joke}</div>
      <div>{joke.punchline}</div>
    </>
  );
};

export default Jokes;
