import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import IconButton from '@mui/material/IconButton';

const HelperInfoToolTip = ({title}) => {

  return (
    <Tooltip
      title={title}>
      <IconButton aria-label="help" size="small">
        <HelpOutlineOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}

export default HelperInfoToolTip