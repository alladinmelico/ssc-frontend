import React, { useEffect, useState } from 'react';
import Page from 'material-ui-shell/lib/containers/Page';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import API from 'config/api';

const Notification = ({history}) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getData = async () => {
    setLoading(true)
    await API.get(`notifications`).then(res => {
      setNotifications(res.data.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }

  const markAsRead = async (notif) => {
    await API.post(`notifications/${notif.id}/read`)
    setNotifications(prev => prev.map(item => {
      if (item.id === notif.id){
        item.read = true
      }
      return item
    }))
  }

  const markAllAsRead = async () => {
    await API.post(`notifications/mark-all-read`)
    setNotifications(prev => prev.map(item => {
      item.read = true
      return item
    }))
  }

  useEffect(() => {
    if (notifications.length === 0) {
      getData()
    } 
  }, [notifications]);

  return (
    <Page
      pageTitle="Notification"
    >
      {loading ? (
        <Stack spacing={1} sx={{ px: "1rem" }}>
          {[...Array(5)].map((x, i) =>
              <Skeleton key={i} animation="wave" height={100} />
          )}
        </Stack>
      ) : (
        <>
          <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ p: "1rem" }}>
            <Button variant="text" onClick={() => markAllAsRead()}>Mark all as Read</Button>
          </Stack>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {notifications.map(notif => (
              <ListItem
                secondaryAction={ !notif.read &&
                  <IconButton edge="end" aria-label="mark" onClick={() => markAsRead(notif)}>
                    <CheckBoxOutlinedIcon />
                  </IconButton>
                }
                sx={{ backgroundColor: notif.read ?  '#f5f5f5': '#ffffff' }}
              >
                <ListItemAvatar>
                  <Avatar>
                    {notif.type === 'schedule' && <InsertInvitationOutlinedIcon />}
                    {notif.type !== 'schedule' && <NotificationsActiveOutlinedIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={notif.type.toUpperCase()} secondary={notif.message} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Page>
  );
};
export default Notification;
