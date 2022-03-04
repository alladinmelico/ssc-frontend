import React from 'react'
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

const SchedDetail = ({label, value}) => {
  return (
    <Box>
      <Typography sx={{fontWeight:"600"}} variant="caption" display="block">
        {label}
      </Typography>
      <Typography variant="body1" display="block">
        {value}
      </Typography>
    </Box>
  )
}


export default SchedDetail;