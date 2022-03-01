import React, { useEffect, useState } from 'react'
import API from '../../config/api'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useSnackbar } from 'notistack'
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import AdminReportForm from './AdminReportForm'
import UserBypassForm from './UserBypassForm'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'

const Communication = () => {
  const [openModal, setOpenModal] = useState(false)
  const [modal, setModal] = useState('')
  const intl = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const { auth } = useAuth()
  const { openDialog, setProcessing } = useQuestions()

  const sendNotification = async () => {
    await API.post(`policy`, {}, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        enqueueSnackbar('ToS/PP successfully sent.', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      }
    })
    .catch(err => {
      enqueueSnackbar('Sending ToS/PP failed.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    })
  };
  
  return (
    
    <Page
      pageTitle={intl.formatMessage({ id: 'communication', defaultMessage: 'Communication' })}
    >
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >

        <Box sx={{ p: '0.5rem' }}>
          <Button onClick={() => {
            setOpenModal(true)
            setModal('REPORT')
          }}>Submit a report to the Admin</Button>
        </Box>
        <Box sx={{ p: '0.5rem' }}>
          <Button onClick={() => {
            setOpenModal(true)
            setModal('BYPASS')
          }}>Submit a by pass</Button>
        </Box>
        <Box sx={{ p: '0.5rem' }}>
          <Button 
            onClick={() => {
            openDialog({
              title: "Notify All Users",
              message: "Are you sure you want to notify all users on updated ToS/PP?",
              action: "Yes",
              handleAction: (handleClose) => {
                sendNotification()
                handleClose()
              },
            })
          }}
          >Notify users on updated Terms of Service and Policy Policy</Button>
        </Box>
      </Stack>
      {modal === 'REPORT' && <AdminReportForm modalClosed={() => setModal('')} openModal={openModal} setOpenModal={setOpenModal} />}          
      {modal === 'BYPASS' && <UserBypassForm modalClosed={() => setModal('')} openModal={openModal} setOpenModal={setOpenModal} />}          
    </Page>
  )
}
export default Communication
