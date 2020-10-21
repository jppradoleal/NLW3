import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nlw-joaop.herokuapp.com'
});

export default api;