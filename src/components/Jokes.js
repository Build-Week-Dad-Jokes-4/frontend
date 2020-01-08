import React, { useState, useContext } from 'react';
import {
  Card,
  CardText,
  CardBody,
  Button,
  InputGroup,
  Input,
  Row,
  Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Context
import { JokeContext } from '../contexts/JokeContext';

// Authentication
import { axiosWithAuth } from '../axiosWithAuth';

const Jokes = ({ joke, deleteJoke }) => {
  const { jokes, setJokes } = useContext(JokeContext);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [jokeToEdit, setJokeToEdit] = useState({});
  const [animateEdit, setAnimateEdit] = useState(false);

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
      <Row>
        <Col lg="11">
          <Card>
            <CardBody
              onClick={() => {
                editJoke(joke);
                setToggleEdit(!toggleEdit);
                setAnimateEdit(!animateEdit);
              }}
            >
              <CardText>
                <strong>Joke: </strong>
                {joke.joke}
              </CardText>
              <CardText>
                <strong>Punchline: </strong>
                {joke.punchline}
              </CardText>
            </CardBody>
            {toggleEdit && (
              <form className="animated fadeIn" onSubmit={saveEdit}>
                <p>edit</p>
                <Input
                  type="text"
                  onChange={e =>
                    setJokeToEdit({ ...jokeToEdit, joke: e.target.value })
                  }
                  value={jokeToEdit.joke}
                />
                <Input
                  type="text"
                  onChange={e =>
                    setJokeToEdit({ ...jokeToEdit, punchline: e.target.value })
                  }
                  value={jokeToEdit.punchline}
                />
                <div>
                  <Button type="submit">Update</Button>
                  <Button onClick={() => setToggleEdit(false)}>Cancel</Button>
                </div>
              </form>
            )}
          </Card>
        </Col>
        <Col lg="1" className="align-self-center align-content-start">
          <FontAwesomeIcon
            className="text-danger"
            icon={faTrash}
            onClick={e => {
              e.stopPropagation();
              deleteJoke(joke.id);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Jokes;
