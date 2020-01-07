import React, { useContext, useEffect, useState } from 'react';

// Components
import Jokes from './Jokes';

// Contexts
// import { LoginContext } from '../contexts/LoginContext';
import { JokeContext } from '../contexts/JokeContext';

// Authentication
import { axiosWithAuth } from '../axiosWithAuth';

const initialJoke = {
  joke: '',
  punchline: '',
  private: false,
  public: false,
  user_id: null
};

const Dashboard = props => {
  // const { credentials } = useContext(LoginContext);
  const user_id = localStorage.getItem('user_id');
  const { jokes, setJokes } = useContext(JokeContext);
  const [editing, setEditing] = useState(false);
  const [jokeToAdd, setJokeToAdd] = useState({
    joke: '',
    punchline: '',
    private: true,
    public: false,
    user_id: null
  });
  const [jokeToEdit, setJokeToEdit] = useState({});

  useEffect(() => {
    axiosWithAuth()
      .get('https://be-dad-jokes.herokuapp.com/api/jokes')
      .then(res => {
        console.log('Dashboard res', res);
        setJokes(res.data);
      })
      .catch(err => console.log(err));
  }, [setJokes]);

  const addJoke = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`https://be-dad-jokes.herokuapp.com/api/jokes/add`, jokeToAdd)
      .then(res => {
        console.log('addJoke', res);
        setJokes([...jokes, jokeToAdd]);
        setJokeToAdd({
          ...jokeToAdd,
          joke: '',
          punchline: ''
        });
      })
      .catch(err => console.log(err));
  };

  const editJoke = joke => {
    setEditing(true);
    setJokeToEdit(joke);
  };

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
        setEditing(false);
        // props.history.push('/protected')
      })
      .catch(err => console.log(err));
  };

  const deleteJoke = id => {
    axiosWithAuth()
      .delete(`https://be-dad-jokes.herokuapp.com/api/jokes/delete/${id}`)
      .then(res => {
        console.log('Joke delete', id, res);
        const filterDeletedJoke = jokes.filter(joke => joke.id !== id);
        setJokes([...filterDeletedJoke]);
        console.log('filterDeletedJoke', filterDeletedJoke);
      })
      .catch(err => console.log(err));
  };

  console.log('List of jokes', jokes);
  console.log('Dashboard credentials', user_id);
  return (
    <div>
      <h2>Dashboard Page</h2>
      {jokes.map(joke => (
        <Jokes
          key={joke.id}
          joke={joke}
          deleteJoke={deleteJoke}
          editing={editing}
          editJoke={editJoke}
          saveEdit={saveEdit}
          jokeToEdit={jokeToEdit}
          setJokeToEdit={setJokeToEdit}
        />
      ))}
      {editing && (
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
          <div>
            <button type="submit">
              save
            </button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <br />
      <form onSubmit={addJoke}>
        <legend>add joke</legend>
        <input
          type="text"
          onChange={e => setJokeToAdd({ ...jokeToAdd, joke: e.target.value })}
          placeholder="add joke"
          value={jokeToAdd.joke}
        />
        <input
          type="text"
          onChange={e =>
            setJokeToAdd({ ...jokeToAdd, punchline: e.target.value })
          }
          placeholder="add punchline"
          value={jokeToAdd.punchline}
        />
        <button type="submit">add joke</button>
      </form>
    </div>
  );
};

export default Dashboard;
