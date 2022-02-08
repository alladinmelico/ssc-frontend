import { green, red, pink, teal, blueGrey, cyan } from '@mui/material/colors'
const primary = {
  500: '#00838f',
  A400: '#00838f',
}

const themes = [
  {
    id: 'default',
    color: '#005662',
    source: {
      palette: {
        primary: primary,
        secondary: primary,
        error: cyan,
      },
    },
  },
  {
    id: 'red',
    color: red[500],
    source: {
      palette: {
        primary: red,
        secondary: pink,
        error: red,
      },
    },
  },
  {
    id: 'green',
    color: green[500],
    source: {
      palette: {
        primary: green,
        secondary: red,
        error: red,
      },
    },
  },
]

export default themes
