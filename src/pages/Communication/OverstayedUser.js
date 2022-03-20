import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import AlarmAddOutlinedIcon from '@mui/icons-material/AlarmAddOutlined';
import ListItemText from '@mui/material/ListItemText';
import API from 'config/api'
import { useSnackbar } from 'notistack'

const OverstayedUser = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [users, setUsers] = useState([])
  const [user, setUser] = useState('')
  const [success, setSuccess] = useState(false)

  const sendNotification = async () => {
    await API.post(`overstay/${user}`)
    .then(res => {
      if (res.status === 200) {
        setSuccess(true)
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
      enqueueSnackbar('Overstay notification failed.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    })
  };

  async function getOverstayed () {
    try {
      const {data} = await API.get('/overstayed/schedule')
      await setUsers(data.data)
      await setSuccess(true)
    } catch (error) {
      setSuccess(false)      
    }
  }

  useEffect(() => {
    if (users.length === 0 && !success) {
      getOverstayed()
    }
  })

  return (
     <List dense>
        {users.map(item => (
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="notify">
                <AlarmAddOutlinedIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.name}
              secondary={item.school_id}
            />
          </ListItem>        
        ))}
    </List>
  )
}

export default OverstayedUser