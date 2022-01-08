import axios from 'axios'
const auth = JSON.parse(localStorage.getItem('auth'))

export default axios.create({
  baseURL: `https://safe-and-smart-campus.herokuapp.com/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth.token}`
  }
});