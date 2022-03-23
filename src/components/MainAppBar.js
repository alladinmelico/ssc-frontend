import React from 'react'
import {useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Typography from '@mui/material/Typography';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Button from '@mui/material/Button';

const MainAppBar = ({title, to, tools, modal, noBack}) => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>

      <Toolbar>
        {!noBack && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() =>  navigate(-1)}
          >
            <ArrowBackOutlinedIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {tools}
        {to && (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={() =>  navigate(to)}
          >
            Add
          </Button>        
        )}
        {modal}
      </Toolbar>
    </AppBar>
  )
}

export default MainAppBar