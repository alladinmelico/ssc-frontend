import { green, red, pink, teal, blueGrey, cyan,  } from '@mui/material/colors'
const primary ={
500: '#00838f',
A400: '#00838f',
}
const light = {
  500: '#b2ffff',
  A400: '#b2ffff',
}
const dark = {
  500: '#48acb8',
  A400: '#48acb8',
}

const blue = {
  500: '#03a9f4',
  A400: '#0276aa',
}

const blueSecondary = {
  500: '#80d8ff',
  A400: '#5997b2',
}

const themes = [
  {
    id: 'default',
    color: '#005662',
    source: {
      palette: {
        primary: primary,
        secondary: light,
        error: red,
      },
    },
  },
  {
    id: 'Sussie',
    color: '#48acb8',
    source: {
      palette: {
        primary: dark,
        secondary: primary,
        error: red,
      },
    },
  },
  {
    id: 'Verditer Blue',
    color: '#03a9f4',
    source: {
      palette: {
        primary: blue,
        secondary: blueSecondary,
        error: red,
      },
    },
  },
  {
    id: 'Celeste',
    color: '#b2ffff',
    source: {
      palette: {
        primary: light,
        secondary: dark,
        error: red,
      },
    },
  },
]

export default themes
