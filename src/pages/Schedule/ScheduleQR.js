import React from 'react'
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import QRCode from "react-qr-code";
import Button from '@mui/material/Button';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import { useAuth } from 'base-shell/lib/providers/Auth';

const ScheduleQR = ({url, schedule, isUpdated}) => {
  const componentRef =  React.createRef();
  const { auth } = useAuth()
  const {
    photoURL: currentPhoroURL = '',
    displayName: currentDisplayName = '',
    email = ''
  } = auth || {};

  return (
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
        <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
          <div>
            <Typography variant='h5' >{currentDisplayName}</Typography>
            <Typography variant='h6' >{email}</Typography>
            <Typography variant='overline' display="block">Time in: {schedule ? schedule.start_at : isUpdated.start_at}</Typography>
            <Typography variant='overline' display="block">Time out: {schedule ? schedule.end_at : isUpdated.end_at}</Typography>
            <div style={{ maxWidth: '200px', textAlign: 'center', opacity: 0.5, marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }}>
              {auth.role === 4 ? (
                <Typography variant='caption'>As guest, QR code will serve as your Gate pass.</Typography>
              ) : (
                <Typography variant='caption'>This QR code does NOT serve as your Gate pass.</Typography>                                            
              )}
              <Typography variant='caption'>(Scan the QR code to check the validity of the Schedule)</Typography>
            </div>
          </div>
          <QRCode value={url} size={200} fgColor="#005662" />
        </Box>
        <Typography variant="caption" sx={{ mt: 3 }}>https://sscsystem.tech</Typography>
      </Paper>
      <Button onClick={() => exportComponentAsJPEG(componentRef, 'ssc-schedule-qr-code')}>
        Export As JPEG
      </Button>
      <Button onClick={() => exportComponentAsPNG(componentRef, 'ssc-schedule-qr-code')}>
        Export As PNG
      </Button>
    </Box>
  )
}

export default ScheduleQR