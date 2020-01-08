import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Jokes from './Jokes';

// Contexts
// import { LoginContext } from '../contexts/LoginContext';
import { JokeContext } from '../contexts/JokeContext';

// Authentication
import { axiosWithAuth } from '../axiosWithAuth';

const Dashboard = props => {
  const user_id = localStorage.getItem('user_id');
  const { jokes, setJokes } = useContext(JokeContext);
  const [jokeToAdd, setJokeToAdd] = useState({
    joke: '',
    punchline: '',
    private: true,
    public: false,
    user_id: null
  });

  useEffect(() => {
    axiosWithAuth()
      .get('https://be-dad-jokes.herokuapp.com/api/jokes')
      .then(res => {
        console.log('Dashboard res', res.data);
        setJokes(res.data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)));
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
    <Container>
      <h2>Dad Jokes List</h2>
      <div>
        <FontAwesomeIcon icon={faPlusCircle} /> Add joke
      </div>
      <p>* click joke to edit</p>
      {jokes.map(joke => (
        <Jokes key={joke.id} joke={joke} deleteJoke={deleteJoke} />
      ))}
      <form onSubmit={addJoke}>
        <legend>add joke</legend>
        <textarea
          type="text"
          onChange={e => setJokeToAdd({ ...jokeToAdd, joke: e.target.value })}
          placeholder="add joke"
          value={jokeToAdd.joke}
        />
        <textarea
          type="text"
          onChange={e =>
            setJokeToAdd({ ...jokeToAdd, punchline: e.target.value })
          }
          placeholder="add punchline"
          value={jokeToAdd.punchline}
        />
        <button type="submit">add joke</button>

      </form>
    </Container>
  );
};

export default Dashboard;
