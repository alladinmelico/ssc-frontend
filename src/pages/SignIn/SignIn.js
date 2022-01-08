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
    <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
      <CustomPaper elevation={6}>
        <div
          sytle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </CustomPaper>
    </Page>
  )
}

export default SignIn
