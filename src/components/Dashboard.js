import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../axiosWithAuth';
import Jokes from './Jokes';

const Dashboard = props => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('https://be-dad-jokes.herokuapp.com/api/jokes')
      .then(res => {
        console.log('Dashboard res', res)
        setJokes(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  console.log('List of jokes', jokes);
  return (
    <>
      <h2>Dashboard Page</h2>
      {jokes.map(joke => (
        <Jokes key={joke.id} joke={joke}/> 
      ))}
    </>
  );
};

export default Dashboard;
