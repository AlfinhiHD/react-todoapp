import axios from 'axios';

const api = axios.create({
  baseURL: 'https://64318b893adb1596516ee16e.mockapi.io' // Ubah dengan URL API yang sesuai
});

export default api;