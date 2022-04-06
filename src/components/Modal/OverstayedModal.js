import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Button, List, Stack, ListItemText, ListSubheader } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import IconButton from '@mui/material/IconButton';
import AlarmAddOutlinedIcon from '@mui/icons-material/AlarmAddOutlined'
import ListItem from '@mui/material/ListItem';
import { useSnackbar } from 'notistack'
import API from 'config/api'

const OverstayedModal = ({modalClosed, schedules_overstay}) => {
  const [openModal, setOpenModal] = useState(false)
  const [success, setSuccess] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const sendNotification = async (user) => {
    await API.post(`overstay/${user}`)
    .then(res => {
      if (res.status === 200) {
        setSuccess(true)
        setOpenModal(false)
        enqueueSnackbar('Overstay notification sent.', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      }
    })
    .catch(err => {
      setSuccess(false)
      setOpenModal(false)
      enqueueSnackbar('Overstay notification failed.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    })
  };

  useEffect(() => {
    
    if (schedules_overstay.length !== 0) {
      setOpenModal(true)
    }
  }, [schedules_overstay])

  return (
    <div>
    <ShowModal
      title="Overstayed Users"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
      >
        <Stack spacing={2}>
        <ItemDetail label="Name" />
      </Stack>
        <List>
          {schedules_overstay.map(item => <ListItem
              secondaryAction={
                  <IconButton edge="end" aria-label="notify">
                    <AlarmAddOutlinedIcon onClick={() => sendNotification(item.id)} />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={item.school_id}
                />
              </ListItem>
            )
          }
        </List>
    </ShowModal>
      </div>
  )
}

export default OverstayedModal;