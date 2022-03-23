import React from 'react'
import { Box } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Button, Fade, Modal, Paper } from '@mui/material';

const GalleryModal = ({label}) => {

  const style = {
    position: 'relative',
        borderRadius: 18,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <Button variant='contained'onClick={handleOpen}><CollectionsOutlinedIcon/></Button>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ overflow:'scroll' }}
      >
        <Fade in={open}>
          <Box className="formModal" style={{bgcolor: 'background.paper'}}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              PICTURE
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Paper>
    </>
  )
}

export default GalleryModal;