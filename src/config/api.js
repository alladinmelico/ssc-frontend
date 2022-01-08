import axios from 'axios'

export default axios.create({
  baseURL: `https://safe-and-smart-campus.herokuapp.com/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${(JSON.parse(localStorage.getItem('auth'))).token}`
  },
});