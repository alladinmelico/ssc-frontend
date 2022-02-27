import { green, red, pink, teal, blueGrey, cyan } from '@mui/material/colors'
const primary ={
500: '#00838f',
A400: '#00838f',
}
const secondary = {
500: '#FF0000',
A400: '#FF0000',
}
const light = {
  500: '#b2ffff',
  A400: '#b2ffff',
}
const dark = {
  500: '#48acb8',
  A400: '#48acb8',
}

const themes = [
  {
    id: 'default',
    color: '#005662',
    source: {
      palette: {
        primary: primary,
        secondary: secondary,
        error: red,
      },
    },
  },
  {
    id: 'Sussie',
    color: '#4fb3bf',
    source: {
      palette: {
        primary: dark,
        secondary: secondary,
        error: red,
      },
    },
  },
  {
    id: 'Verditer Blue',
    color: '#48acb8',
    source: {
      palette: {
        primary: primary,
        secondary: secondary,
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
        secondary: secondary,
        error: red,
      },
    },
  },
]

export default themes
