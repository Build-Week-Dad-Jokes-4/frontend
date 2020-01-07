import React from 'react';

const Jokes = ({
  joke,
  deleteJoke,
  editJoke,
  // editing,
  // saveEdit,
  // jokeToEdit,
  // setJokeToEdit
}) => {
  return (
    <div>
      <div>
        <div>{joke.joke}</div>
        <div>{joke.punchline}</div>
        <button onClick={() => editJoke(joke)}>Edit</button>
        <button
          onClick={e => {
            e.stopPropagation();
            deleteJoke(joke.id);
          }}
        >
          Delete
        </button>
      </div>
      {/* {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit joke</legend>
          <input
            type="text"
            onChange={e =>
              setJokeToEdit({ ...jokeToEdit, joke: e.target.value })
            }
            value={jokeToEdit.joke}
          />
          <input
            type="text"
            onChange={e =>
              setJokeToEdit({ ...jokeToEdit, punchline: e.target.value })
            }
            value={jokeToEdit.punchline}
          />
        </form>
      )} */}
    </div>
  );
};

export default Jokes;
