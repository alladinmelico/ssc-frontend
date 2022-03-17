import React, {useEffect, useState} from 'react'
import Page from 'material-ui-shell/lib/containers/Page';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack'

const Monitor = () => {
  const [user, setUser] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!user) {
      window.echo.channel('logging').listen('UserLogging', (e) => {
        enqueueSnackbar(`${e.rfid.user.name} logged ${e.rfid.is_logged ? 'in' : 'out'}.`, {variant: 'success'})  
        console.log(e)
        setUser(e.rfid.user)
      })
      window.echo.channel('temperature').listen('UserTemperature', (e) => {
        enqueueSnackbar(`${e.temperature.user.name} recorded ${e.temperature.temperature}.`, {variant: 'info'}) 
        setUser(e.temperature.user)
      })
    }
  })

  return (
    <Page pageTitle="Monitor Logins">
      <Container sx={{ mt: "2rem" }}>
        
      </Container>
    </Page>
  )

}

export default Monitor