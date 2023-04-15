import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Request interceptors for API calls
axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Token ${localStorage.getItem('token')}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
        error => {
            return Promise.reject(error);
        }
);

axiosInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );