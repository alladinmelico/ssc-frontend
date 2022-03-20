import axios from 'axios'

export default axios.create({
  baseURL: `https://phplaravel-745170-2505664.cloudwaysapps.com/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${(JSON.parse(localStorage.getItem('auth'))).token}`
  },
});