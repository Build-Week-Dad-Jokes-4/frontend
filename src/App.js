import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import JokeList from './components/JokeList';
import AddJoke from './components/AddJoke';
import Footer from './components/Footer';
import Welcome from './components/HomePage';
import QuestionCard from './components/CardHandler';

// Contexts
import { JokeContext } from '../src/contexts/JokeContext';
import { LoginContext } from '../src/contexts/LoginContext';

import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  return (
    <Router>
      <div className="App">
        <LoginContext.Provider value={{ credentials, setCredentials }}>
          <JokeContext.Provider value={{ jokes, setJokes }}>
            <Header />
            <Route exact path = '/' component = {Welcome}/>
            <Route  path = '/Contact'/>
            {/* <Route path = '/Login'/> */}
            <Route path = '/Jokes' component = {QuestionCard}/>
            <Switch>
              <PrivateRoute exact path="/jokelist" component={JokeList} />
              <PrivateRoute exact path="/addjoke" component={AddJoke} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
            <Footer/>
          </JokeContext.Provider>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
