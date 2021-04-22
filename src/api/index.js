const axios = require('axios');

export const http = axios.create({
  baseURL: 'https://localhost:44308',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
    http: http
}