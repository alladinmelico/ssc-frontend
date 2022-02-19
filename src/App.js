import React, { Component } from 'react'
import App from 'base-shell/lib'
import MUIConfig from 'material-ui-shell/lib'
import merge from 'base-shell/lib/utils/config'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import _config from './config'
import './App.css'
import axios from 'axios'

const config = merge(MUIConfig, _config)

export default class Demo extends Component {

   componentDidMount() {

    const echo = new Echo({
      broadcaster: 'pusher',
      key: '6abdea39720f6b0b8824',
      cluster: 'ap1',
    })

    echo.channel('course').listen('CourseCreated', (e) => {
      console.log(e)
    })
  }

  render() {
    return <App config={config} />
  }
}
