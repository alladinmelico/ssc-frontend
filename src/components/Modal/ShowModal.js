import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

const ShowModal = ({title, cancelled, openModal, setOpenModal, children}) => {
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false)
    cancelled()
  };

  return (
    <Paper
      elevation={16}
      style={{
        position: 'relative',
        borderRadius: 18,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Fab onClick={handleOpen} color="primary" aria-label="add" className="fabIcon">
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ overflow:'scroll' }}
      >
        <Fade in={openModal}>
          <Box className="formModal" style={{bgcolor: 'background.paper'}}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            {children}
          </Box>
        </Fade>
      </Modal>
    </Paper>
  );
}

export default ShowModal;