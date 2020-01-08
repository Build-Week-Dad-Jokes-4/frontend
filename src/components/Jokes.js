import React, { useState, useContext } from 'react';

// Context
import { JokeContext } from '../contexts/JokeContext';

// Authentication
import { axiosWithAuth } from '../axiosWithAuth';

const Jokes = ({ joke, deleteJoke,}) => {

  const { jokes, setJokes } = useContext(JokeContext);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [jokeToEdit, setJokeToEdit] = useState({});

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(
        `https://be-dad-jokes.herokuapp.com/api/jokes/update/${jokeToEdit.id}`,
        jokeToEdit
      )
      .then(res => {
        console.log('editJoke res', res.data[0]);
        const filterEditJoke = jokes.filter(joke => joke.id !== res.data[0].id);
        console.log('editJoke filterEditJoke', filterEditJoke);
        setJokes(
          [...filterEditJoke, res.data[0]].sort(
            (a, b) => parseFloat(a.id) - parseFloat(b.id)
          )
        );
        setJokeToEdit({ joke: '', punchline: '' });
        setToggleEdit(false);
      })
      .catch(err => console.log(err));
  };

  const editJoke = joke => {
    setJokeToEdit(joke);
  };

  return (
    <div>
      <div>
        <div>Joke: {joke.joke}</div>
        <div>Punchline: {joke.punchline}</div>
        <button
          onClick={() => {
            editJoke(joke);
            setToggleEdit(true);
          }}
        >
          Edit
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            deleteJoke(joke.id);
          }}
        >
          Delete
        </button>
      </div>
      {toggleEdit && (
        <form className="animated fadeIn" onSubmit={saveEdit}>
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
          <div>
            <button type="submit">Update</button>
            <button onClick={() => setToggleEdit(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Jokes;
