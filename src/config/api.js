import axios from 'axios'

export default axios.create({
  baseURL: `https://www.sscsystem.tech/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});