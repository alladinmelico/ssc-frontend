import { green, red, pink, teal, blueGrey } from '@mui/material/colors'

const themes = [
  {
    id: 'default',
    color: '#80deea',
    source: {
      palette: {
        primary: teal,
        secondary: blueGrey,
        error: red,
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
