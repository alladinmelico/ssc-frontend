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
      authEndpoint: 'https://safe-and-smart-campus.herokuapp.com/broadcasting/auth',
      // forceTLS: true,
      authTransport: 'jsonp',
    })
    // // echo.private('App.Models.User.1').notification((data) => {
    // //   console.log('hello')
    // //   console.log(data);
    // // })
    // // echo.private('App.Models.User.1')
    // //   .listen('ScheduleCreated', (e) => {
    // //     console.log(e);
    // // });
    echo.channel('course').listen('CourseCreated', (e) => {
      console.log(e)
    })
    // console.log(echo)
    // echo.private('user.1').listen('AA', (e) => {
    //   console.log(e)
    // })
    // const authUrl = 'https://safe-and-smart-campus.herokuapp.com/broadcasting/auth'
    // let authorizer = (channel, options) => {
    //   return {
    //     authorize: (socketId, callback) => {
    //       fetch(authUrl, {
    //         method: "POST",
    //         headers: new Headers({ 
    //           "Content-Type": "application/json",
    //           "X-CSRF-TOKEN": "eyJpdiI6ImpreE01K254bnF3Qmt2ajU4ZVZvc3c9PSIsInZhbHVlIjoiUCs2SXE3dGw5UWhqUDZMZW56cng3cjgxTVBKaVh5OG9pU28zcWZXemNHcHN3b3VkMVRzcU1VWGt2N1ZxVmtHdnU1STFOU1d1VSt3K2hraW80STdKL1h0enErdVhPUUdQU2NQNEdWeU1xRTRraHpyTjFkN0pGckpxemcyd09NMisiLCJtYWMiOiI3NDBkZWNlMzNhYjYwYTJjNWEzNDQ0NDVkMTgyNWI0NjBiZGM0YjBlYTUyMGQyYTQyYjRlOTUwMmRkZjI5OGNlIiwidGFnIjoiIn0%3D",
    //           Authorization: `Bearer 22|zkWBVTrIonmj8iAjNQwU0p93ok9oTj5vFvp5rPnR`
    //         }),
    //         body: JSON.stringify({
    //           socket_id: socketId,
    //           channel_name: channel.name
    //         })
    //       })
    //         .then(res => {
    //           if (!res.ok) {
    //             throw new Error(`Received ${res.statusCode} from ${authUrl}`);
    //           }
    //           return res.json();
    //         })
    //         .then(data => {
    //           callback(null, data);
    //         })
    //         .catch(err => {
    //           callback(new Error(`Error calling auth endpoint: ${err}`), {
    //             auth: ""
    //           });
    //         });
    //     }
    //   };
    // };
    // axios.get('https://safe-and-smart-campus.herokuapp.com/sanctum/csrf-cookie').then(response => {
    //     console.log(response)
    //     const pusher = new Pusher('6abdea39720f6b0b8824', {
    //     broadcaster: 'pusher',
    //     key: '6abdea39720f6b0b8824',
    //     cluster: 'ap1',
    //     appId: '1032829',
    //     secret: 'a8dfb9abd1879487d1f1',
    //     authEndpoint: 'https://safe-and-smart-campus.herokuapp.com/broadcasting/auth',
    //     // forceTLS: true,
    //     // authorizer,
    //     authTransport: 'jsonp',
    //     auth: {
    //       headers: {
    //         Authorization: `Bearer 22|zkWBVTrIonmj8iAjNQwU0p93ok9oTj5vFvp5rPnR`,
    //         Accept:'application/json',
    //       }
    //     }
    //   });
    //   const channel = pusher.subscribe('private-course');
    //   channel.bind('ScheduleCreated', data => {
    //     console.log('pusher', data)
    //   });
    // });
    
  }

  render() {
    return <App config={config} />
  }
}
