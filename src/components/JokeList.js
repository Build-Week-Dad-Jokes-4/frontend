import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Container, Input, Form, FormGroup, Col, Button } from 'reactstrap';

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
  const [toggleAdd, setToggleAdd] = useState(false);
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
  }, [setJokes, jokeToAdd]);

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
    <Container className="w-75 mt-5">
      <h2>Welcome {user_id}</h2>
      <p>
        Here's your access to the full list of Dad Jokes, where you can add,
        modify and delete the list of jokes
      </p>
      <Form className=" mt-5 mb-5">
        <div className="add-icon mt-5 mr-5">
          <FontAwesomeIcon
            onClick={() => {
              setToggleAdd(!toggleAdd);
            }}
            icon={faPlusCircle}
          />
          Add Joke
        </div>
        {toggleAdd && (
          <Col className="mt-3" lg="11">
            <Form className="animated fadeIn" onSubmit={addJoke}>
              <FormGroup>
                <Input
                  type="text"
                  onChange={e =>
                    setJokeToAdd({ ...jokeToAdd, joke: e.target.value })
                  }
                  placeholder="add joke"
                  value={jokeToAdd.joke}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  onChange={e =>
                    setJokeToAdd({ ...jokeToAdd, punchline: e.target.value })
                  }
                  placeholder="add punchline"
                  value={jokeToAdd.punchline}
                />
              </FormGroup>
              <div>
                <Button color="success" type="submit">
                  Add
                </Button>{' '}
                <Button
                  color="warning"
                  onClick={() => {
                    setToggleAdd(!toggleAdd);
                    setJokeToAdd({
                      ...jokeToAdd,
                      joke: '',
                      punchline: ''
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        )}
      </Form>

      {jokes.map(joke => (
        <Jokes key={joke.id} joke={joke} deleteJoke={deleteJoke} />
      ))}
    </Container>
  );
};

export default Dashboard;
