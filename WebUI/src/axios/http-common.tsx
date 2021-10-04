import axios from 'axios';

const http = axios.create({
  baseURL: 'https://localhost:44360/api/user',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }
});

export default http;
