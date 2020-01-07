import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

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
            <h1>Dad Jokes 4.0</h1>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </JokeContext.Provider>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
