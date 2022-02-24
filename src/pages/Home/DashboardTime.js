import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';

const DashboardTime = () => {

  const [clock, setClock] = useState('')
  
  useEffect(() => {
    setInterval(() => {
      setClock(new Date().toLocaleString())
    }, 1000);
  })

  return (
    <Typography ml={4} variant="h4" sx={{ color: 'GrayText' }}>
      {clock}
    </Typography>
  )
}

export default DashboardTime