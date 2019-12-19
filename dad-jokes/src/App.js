import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Welcome from './components/HomePage';
import {Route} from 'react-router-dom';
import Card from './components/Card';
import Footer from './components/Footer';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Route exact path = '/' component = {Welcome}/>
      <Route  path = '/Contact'/>
      <Route path = '/Login'/>
      <Route path = '/Jokes' component = {Card}/>
      <Footer/>
    </div>
  );
}

export default App;
