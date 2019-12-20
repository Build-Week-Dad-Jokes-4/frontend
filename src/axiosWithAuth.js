import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'https://be-dad-jokes.herokuapp.com/api/auth/login',
    headers: {
      Authorization: token
    }
  });
};
