import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux"
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import QRCode from "react-qr-code";
import { useAuth } from 'base-shell/lib/providers/Auth';
import { Avatar, Paper, Typography } from '@mui/material';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import {
  newSchedule,
  clearErrors,
} from "../../../actions/scheduleActions"
import { Link } from 'react-router-dom';

export default function Step5({history}) {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch()
  const componentRef =  React.createRef();
  const { schedule } = useSelector((state) => state.newSchedule)

  const { auth } = useAuth();
  const {
    photoURL: currentPhoroURL = '',
    displayName: currentDisplayName = '',
    email = ''
  } = auth || {};


  useEffect(() => {
    if (schedule) {
      setUrl(`https://safe-and-smart-campus.herokuapp.com/schedule/${schedule.id}`)
    }
  }, [dispatch, history, schedule])

  return (
    <Box sx={{ minWidth: 120 }}>

          {url ? (
            <Box>
              <Paper
                ref={componentRef}
                variant="outlined"
                sx={{  display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', py: 2 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <img src='/logo192.png' alt="logo" height={50} />
                  <Typography variant='outline' >Safe and Smart Campus</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                  <div>
                    <Typography variant='h5' >{currentDisplayName}</Typography>
                    <Typography variant='h6' >{email}</Typography>
                    <Typography variant='overline' display="block">Time in: {schedule.start_at}</Typography>
                    <Typography variant='overline' display="block">Time out: {schedule.end_at}</Typography>
                  </div>
                  <QRCode value={url} size={200} fgColor="#005662" />
                </Box>
                <Typography variant="caption" sx={{ mt: 3 }}>https://sscsystem.tech</Typography>
              </Paper>
              <Button onClick={() => exportComponentAsJPEG(componentRef, 'ssc-schedule-qr-code')}>
                Export As JPEG
              </Button>
              <Button onClick={() => exportComponentAsPDF(componentRef, 'ssc-schedule-qr-code')}>
                Export As PDF
              </Button>
              <Button onClick={() => exportComponentAsPNG(componentRef, 'ssc-schedule-qr-code')}>
                Export As PNG
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <Box>
                <Skeleton variant="rectangular" width={210} height={118} animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </Box>
              <Skeleton variant="rectangular" width={210} height={118} animation="wave" />
            </Box>
          )}

        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 3 }}>
          <Link to="/schedule" >
            <Button color="primary">Done</Button>
          </Link>
        </Box>
    </Box>
  );
}