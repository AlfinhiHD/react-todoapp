import axios from 'axios';

axios.interceptors.request.use(
  (config) => {

    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    console.log(user.token)

    config.headers.Authorization = user.token;
    console.log('Interceptor - Permintaan: ', config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
