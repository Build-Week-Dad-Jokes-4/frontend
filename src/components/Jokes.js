import React, { useState, useContext } from 'react';
import {
  Card,
  CardText,
  CardBody,
  Button,
  Input,
  Row,
  Col,
  Form,
  FormGroup
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faThumbsUp,
  faThumbsDown
} from '@fortawesome/free-solid-svg-icons';

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
            (a, b) => parseFloat(b.id) - parseFloat(a.id)
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
    <div className="mb-1 animated fadeInDown">
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
            <div>
              <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="ml-2 fa-flip-horizontal"
              />
            </div>
            {toggleEdit && (
              <Form className="animated fadeIn mt-3 mx-3" onSubmit={saveEdit}>
                <p>edit</p>
                <FormGroup>
                  <Input
                    type="text"
                    id="editJoke"
                    onChange={e =>
                      setJokeToEdit({ ...jokeToEdit, joke: e.target.value })
                    }
                    value={jokeToEdit.joke}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    onChange={e =>
                      setJokeToEdit({
                        ...jokeToEdit,
                        punchline: e.target.value
                      })
                    }
                    value={jokeToEdit.punchline}
                  />
                </FormGroup>
                <div className="my-3">
                  <Button color="primary" type="submit">
                    Update
                  </Button>{' '}
                  <Button
                    color="warning"
                    onClick={() => setToggleEdit(!toggleEdit)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Card>
        </Col>
        <Col lg="1" className="align-self-center">
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
