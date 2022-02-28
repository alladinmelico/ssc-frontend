import React from 'react'
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

const ItemDetail = ({label, value}) => {
  return (
    <Box>
      <Typography variant="caption" display="block">
        {label}
      </Typography>
      <Typography variant="body1" display="block">
        {value}
      </Typography>
    </Box>
  )
}

export default ItemDetail;