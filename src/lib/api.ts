import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const api = axios.create({
  baseURL: isProduction ? '/api' : 'http://localhost:3001/api',
});

export default api;
