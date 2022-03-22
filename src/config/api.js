import axios from 'axios'

const customAxios = axios.create({
  baseURL: `https://phplaravel-745170-2505664.cloudwaysapps.com/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${(JSON.parse(localStorage.getItem('auth'))).token}`
  },
});

const responseHandler = response => {
    if (response.status === 401 || response.status === 419 || response.status === 403) {
      localStorage.setItem('auth',JSON.stringify({ isAuthenticated: false }));
      window.location = '/signin'
    }

    return response;
};

const errorHandler = error => {
  const status = error.response?.status
  if (status === 401 || status === 419 || status === 403 ) {
    localStorage.setItem('auth',JSON.stringify({ isAuthenticated: false }));
    window.location = '/signin'
  } else {
    return Promise.reject(error);
  }
};

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );

export default customAxios;
