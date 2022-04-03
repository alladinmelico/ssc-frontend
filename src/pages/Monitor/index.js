import React, { useEffect, useState } from 'react';
import Page from 'material-ui-shell/lib/containers/Page';
import { Box, Container, Stack, Avatar, Paper, Typography, Grid, Skeleton } from '@mui/material';

const Monitor = () => {
  const [user, setUser] = useState('');
  const [temperature, setTemperature] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (!user) {
      window.echo.channel('logging').listen('UserLogging', (e) => {
        console.log(e);
        setUser(e.rfid.user);
        if (e.rfid.is_logged) {
          setLogged(true)
          setSchedules(e.rfid.schedules);
        } else {
          setLogged(false)
          setSchedules([])
        }
      });
      window.echo.channel('temperature').listen('UserTemperature', (e) => {
        console.log(e)
        setTemperature(e.temperature);
        setUser(e.temperature.user);
      });
    }
  });

  return (
    <Page pageTitle="Monitor Logins">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Container sx={{ my: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper
                elevation={3}
                style={{
                  position: 'relative',
                  borderRadius: 18,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  style={{ width: 130, height: 130, marginTop: -40 }}
                  alt="User Picture"
                  src={user.avatar_original}
                />
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  marginRight="1rem"
                  marginLeft="1rem"
                  sx={{ textAlign: 'center', pb: '1rem' }}
                >
                  <Typography variant="h5">{user.name}</Typography>
                  <Typography sx={{ mt: "1rem" }} variant="body1">{user.school_id}</Typography>
                  <Typography sx={{ mt: "1rem" }} variant="body2">{user.email}</Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Stack direction="column" spacing={4}>
                {temperature ? (
                  <Paper elevation={1} sx={{ textAlign: 'center', backgroundColor:  temperature.temperature < 37.5 ? 'green' : 'red' }} >
                    <Typography sx={{fontWeight:"600", color: 'white'}} variant="h2">{temperature.temperature.toFixed(2)}</Typography>
                  </Paper>
                ): (
                  <Skeleton sx={{width:"100%"}} animation="wave" height={100} />
                )}
                <Paper elevation={1} sx={{ p: '1rem' }} >
                  {logged ? (
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="overline">Start time:</Typography>
                        <Typography variant="h5">{schedules.length > 0 ? schedules[0].start_at : ''}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="overline" sx={{ mt: '2rem' }}>End time:</Typography>
                        <Typography variant="h5">{schedules.length > 0 ? schedules[0].end_at : ''}</Typography>
                      </Box>
                    </Stack>
                  ) : (
                    <Typography variant="h5" >Logged Out</Typography>
                  )}
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Page>
  );

};

export default Monitor;