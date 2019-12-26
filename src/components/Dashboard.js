import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../axiosWithAuth';

const Dashboard = props => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('https://be-dad-jokes.herokuapp.com/api/jokes')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  });

  return <h2>Dashboard Page</h2>;
};

export default Dashboard;
