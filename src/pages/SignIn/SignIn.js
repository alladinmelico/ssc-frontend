import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme } from '@mui/material/styles'
import CustomPaper from '../../components/CustomPaper'
import { GoogleLogin } from 'react-google-login'
import API from '../../config/api'
import { Typography, Grid } from '@mui/material';
import helloimage from '../../public/Hello-rafiki 1.png';

const SignIn = ({ redirectTo = '/' }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  let location = useLocation()
  const { toggleThis } = useMenu()
  const { setAuth } = useAuth()

  const responseGoogle = async response => {
    if (!response.error) {
      await API.post(`auth`, {
          name: response.profileObj.name,
          email: response.profileObj.email,
          google_id: response.googleId,
          avatar: response.profileObj.imageUrl,
          avatar_original: response.profileObj.imageUrl        
        }).then(res => {
        authenticate({
          ...response.profileObj,
          displayName: response.profileObj.name,
          googleToken: response.accessToken,
          token: res.data.token,
          photoURL: response.profileObj.imageUrl,
          hasProfile: res.data.hasProfile
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log(response)
    }
  }

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user })
    toggleThis('isAuthMenuOpen', false)

    let from = new URLSearchParams(location.search).get('from')

    if (from) {
      navigate(from, { replace: true })
    } else {
      navigate(redirectTo, { replace: true })
    }
  }

  return (
    <>
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    >
      <Grid Item paddingTop={8} maxWidth={500} align={'center'}>
        <Typography 
        style={{
          fontFamily:"Roboto",
          fontSize:20
        }}>
          Welcome to Safe and Smart Campus: A Scheduling and Monitoring System for Technological University of the Philippines - Taguig Campus
        </Typography>
      </Grid>

      <Grid Item paddingTop={5} paddingBottom={0}>
        <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign In"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
        </Grid>

      <Grid Item paddingTop={0}>
      <img src={helloimage} height={504} width={429} alt="HelloImage"/>
      </Grid>

    </Grid>
    </>
  )
}

export default SignIn