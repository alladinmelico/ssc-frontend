import React from 'react';
import { Box } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Button, Fade, Modal, Paper } from '@mui/material';
import gallery from 'constants/gallery';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

const GalleryModal = ({ selectedDepartment }) => {

  const departments = [
    'Bachelor of Engineering and Allied Department',
    'Basic Arts and Sciences Department',
    'Civil and Allied Department',
    'Electrical and Allied Department',
    'Mechanical and Allied Department',
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton aria-label="gallery" color="primary" onClick={handleOpen}>
        <CollectionsOutlinedIcon />
      </IconButton>
      {open && (
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
            sx={{ overflow: 'scroll' }}
          >
            <Fade in={open}>
              <Box className="formModal" style={{ width: '100%', maxWidth: 500 }}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {departments[selectedDepartment - 1]} Gallery
                </Typography>
                <ImageList sx={{ maxWidth: 500, height: 450 }} variant="quilted" cols={1}>
                  {gallery.filter(item => item.department === selectedDepartment).map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                      />
                      <ImageListItemBar title={item.name} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Fade>
          </Modal>
        </Paper>
      )}
    </>
  );
};

export default GalleryModal;