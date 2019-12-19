import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Dad Jokes 4.0</h1>
        <Switch>
          <Route path="/login" component={Login} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
