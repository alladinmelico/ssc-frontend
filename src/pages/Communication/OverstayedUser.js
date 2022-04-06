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

  console.log(users.map(item => item.batches.map(b => b.user)))

  return (
     <List>
        {users.map(item => item.batches.map(b => b.user)).map(item => (
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