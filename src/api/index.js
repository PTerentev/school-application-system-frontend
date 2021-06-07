const axios = require('axios');
const { apiUrl } = require('../config')

export const http = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
    http: http
}