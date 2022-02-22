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
import { Typography, Grid, Backdrop, CircularProgress, Box } from '@mui/material';
import helloimage from '../../public/Hello-rafiki 1.png';
import { Dashboard } from '@mui/icons-material'
import HomePage from 'pages/Home/Home'
import Container from '@mui/material/Container';

const SignIn = ({ redirectTo = '/' }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  let location = useLocation()
  const { toggleThis } = useMenu()
  const { setAuth } = useAuth()

  const [loading, setLoading] = useState(false);

  const responseGoogle = async response => {
    if (!response.error) {
      setLoading(true)
      await API.post(`auth`, {
          name: response.profileObj.name,
          email: response.profileObj.email,
          google_id: response.googleId,
          avatar: response.profileObj.imageUrl,
          avatar_original: response.profileObj.imageUrl        
        }).then(res => {
          setLoading(false)
          authenticate({
            ...response.profileObj,
            displayName: response.profileObj.name,
            googleToken: response.accessToken,
            token: res.data.token,
            photoURL: response.profileObj.imageUrl,
            hasProfile: res.data.hasProfile
          })
          window.location.reload();
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
    <Page
      pageTitle="Signin"
    >
      {loading ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%', height: '100%' }}>
          <Box sx={{ display: 'block', mx:"auto", my: "auto" }} >
            <img src="loading.gif" alt="Loading GIF"/>
          </Box>
        </Container>
      ) : (
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

          <Grid Item paddingTop={5} paddingBottom={0} align={'center'}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign In"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
                    
            <Typography 
              style={{
                fontFamily:"Roboto",
                fontSize:12,
                marginTop: "1rem",
                opacity: 0.8
              }}>
              By signing in, you agree to our <a style={{color:"#00838f", textDecoration:"none"}} href="/terms-of-service.pdf" target="_blank">terms of service</a> and 
              <a style={{color:"#00838f", textDecoration:"none"}} href="/privacy-policy.pdf" target="_blank"> privacy policy</a>.
            </Typography>
          </Grid>

          <Grid Item paddingTop={0}>
          <img src={helloimage} height={504} width={429} alt="HelloImage"/>
          </Grid>
        </Grid>      
      ) }    
  </Page>
  )
}

export default SignIn
