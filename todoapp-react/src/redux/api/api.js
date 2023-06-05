import axios from 'axios';

const api = axios.create({
  baseURL: 'http://example.com/api' // Ubah dengan URL API yang sesuai
});

export default api;