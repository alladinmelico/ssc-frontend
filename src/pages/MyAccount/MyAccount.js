import { Avatar, Fab, InputBase, Paper, Zoom, Typography } from '@mui/material';
import { Camera, Delete, Save, Person as PersonIcon, Edit } from '@mui/icons-material';
import Page from 'material-ui-shell/lib/containers/Page/Page';
import React, { useState, useEffect } from 'react';
import { useAuth } from 'base-shell/lib/providers/Auth';
import { useIntl } from 'react-intl';
import API from '../../config/api'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question';
import ImgageUploadDialog from 'material-ui-shell/lib/containers/ImageUploadDialog';

import ProfileForm from './ProfileForm'
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const MyAccount = () => {
  const intl = useIntl();
  const { openDialog } = useQuestions();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false)
  const [user, setUser, count] = useState('')
  
  const { auth, updateAuth, setAuth } = useAuth();
  const {
    photoURL: currentPhoroURL = '',
    displayName: currentDisplayName = '',
    email = '',
  } = auth || {};
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [photoURL, setPhotoURL] = useState(currentPhoroURL);
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  

  const hasChange =
    displayName !== currentDisplayName || photoURL !== currentPhoroURL;

  const handleImageChange = (image) => {
    setPhotoURL(image);
  };

  const handleSave = async () => {
    updateAuth({ ...auth, displayName, photoURL });
  };

  const openDeleteDialog = () => {
    openDialog({
      title: intl.formatMessage({
        id: 'delete_account_dialog_title',
        defaultMessage: 'Delete Account?',
      }),
      message: intl.formatMessage({
        id: 'delete_account_dialog_message',
        defaultMessage:
          'This Account and all related data to it will be deleted permanently. Do you want to proceed with the deletion?',
      }),
      action: intl.formatMessage({
        id: 'delete_account_dialog_action',
        defaultMessage: 'DELETE ACCOUNT',
      }),
      handleAction: handleDelete,
    });
  };

  const handleDelete = async (handleClose) => {
    setAuth({ isAuthenticated: false });
    handleClose();
  };

  const getUser = async () => {
    setLoading(true)
    await API.get(`/user/${auth.id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(res => {
        console.log(res)
        setUser(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  };
  useEffect(() =>{
    getUser()
  },[])
  

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'my_account',
        defaultMessage: 'My Account',
      })}
    > {!loading ? (
      <Typography textAlign="center" sx={{fontWeight:"600", mt:"2rem"}} variant="h5">Hi, {user.name}</Typography> 
      ) : (
        <Skeleton sx={{mx:"auto"}} variant="text" animation="wave" width={500} height={100} />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {isEditing ?
          (
            <ProfileForm onSubmitHandler={() => {
              setIsEditing(false)
              getUser()
            }}
            user={user}
            setIsEditing={setIsEditing} />
          ) :  
            
            <Paper 
                  elevation={3}
                  style={{
                    position: 'relative',
                    borderRadius: 18,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
              
              <Fab
                size="medium"
                style={{ position: 'absolute', top: 50, marginRight: -90, zIndex: 99 }}
                onClick={() => setIsEditing(true)}
                color="primary"
                aria-label="edit"
              >
                <Edit />
              </Fab>

              {photoURL && (
                <Avatar
                  style={{ width: 130, height: 130, marginTop: -40 }}
                  alt="User Picture"
                  src={photoURL}
                />
              )}
              {!photoURL && (
                <Avatar
                  style={{ width: 130, height: 130, marginTop: -40 }}
                  alt="User Picture"
                >
                  {displayName ? displayName[0].toUpperCase() : <PersonIcon />}
                </Avatar>
              )}
              {!loading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginTop: 18,
                  marginBottom: 18,
                }}
              >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                marginRight="1rem"
                marginLeft="1rem"
            >
                <Typography sx={{fontWeight:"600", mt:"1rem"}} variant="h5">{user.name}</Typography>
                <Typography style={{mt:"14px"}} variant="body1">{user.course_name}</Typography>
                <Typography style={{mt:"14px"}}  variant="body1">{user.year}{user.section}</Typography>
                <Typography sx={{mt:"1rem"}} variant="body2">{user.email}</Typography>
                </Stack>
              </div>
               ) : (
                <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                marginRight="1rem"
                marginLeft="1rem"
                marginTop="1rem"
                >
                <Skeleton animation="wave" variant="text" width={400} />
                <Skeleton animation="wave" variant="text" width={500} />
                <Skeleton animation="wave" variant="text" width={100} />
                <Skeleton animation="wave" variant="text" width={200} />
                </Stack>
              )}  
                


              <Zoom in={hasChange}>
                <Fab
                  onClick={handleSave}
                  style={{ marginBottom: -20, marginTop:"1rem" }}
                  color="primary"
                  aria-label="save"
                >
                  <Save />
                </Fab>
              </Zoom>
            </Paper>
        }
      </div>
    </Page >
  )
}

export default MyAccount;
