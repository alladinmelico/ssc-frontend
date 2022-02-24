import React, {useState, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

export default function FormModal ({title, onSubmit, success, loading, cancelled, openModal, setOpenModal, children}) {
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    if (success) {
      setOpenModal(false)
    }
  }, [success, setOpenModal]) 

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
            <form onSubmit={onSubmit}>
              {children}
              <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                <Button onClick={() => {
                  setOpenModal(false)
                  cancelled()
                }} variant="outlined" color="secondary">Cancel</Button>
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  type="submit"
                >
                  Save
                </LoadingButton>
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Paper>
  );
}