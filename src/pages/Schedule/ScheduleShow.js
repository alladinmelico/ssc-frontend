import React, {useState, useEffect} from "react";
import { Stack } from "@mui/material";
import SchedDetail from "components/Modal/SchedDetail";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Page from 'material-ui-shell/lib/containers/Page';
import Skeleton from '@mui/material/Skeleton';
import API from '../../config/api'

const ScheduleShow = () => {
  const loc = window.location.pathname
  const id = loc.substring(loc.lastIndexOf('/') + 1);
  const [schedule, setSchedule] = useState('')

  async function getSchedule() {
    try {
      const {data} = await API.get(`schedule/${id}`)
      console.log(data)
      await setSchedule(data.data)
    } catch (error) {
      setSchedule('')
    }
  }

  useEffect(() => {
    if (!schedule) {
      getSchedule()
    }
  }, [schedule])

  return (
     <Page
      pageTitle="Schedule Details"
    >
      {!schedule ? (
        <Box sx={{ width: '100%', height: '100%' }}>
          <Skeleton variant="rectangular" height={200} animation="wave" sx={{ my: 2  }} />
          <Skeleton variant="rectangular" height={118} animation="wave" sx={{ my: 2  }} />
          <Skeleton variant="text" sx={{ my: 2  }} />
        </Box>
      ) :(      
      <Box sx={{ p: '1rem' }}>
        <Box sx={{mx:"auto", mt:"1rem"}}>
          <SchedDetail label="User" value={schedule.user?.name} /> 
        </Box>
        <Box sx={{mx:"auto", mt:"1rem"}}>
          <Stack sx={{mt:"1rem"}} direction="row" spacing={2}>
            <SchedDetail label="Title" value={schedule.title} />
            <SchedDetail label="Type" value={schedule.type} />
            <SchedDetail label="Classroom" value={schedule.classroom?.name} />
          </Stack>
        </Box> 
        <Box sx={{mx:"auto", mt:"1rem"}}>
          <SchedDetail label="Facility" value={schedule.facility?.name} />
        </Box>
        <Box sx={{mx:"auto"}}>
          <Stack sx={{mt:"12px"}} direction="row" spacing={2}>
            <SchedDetail label="Start Time" value={schedule.start_at} />
            <SchedDetail label="End Time" value={schedule.end_at} />
          </Stack>
        </Box> 
        <Box sx={{mx:"auto", mt:"10px"}}>
          <Stack sx={{mt:"12px"}} direction="row" spacing={2}>
            <SchedDetail label="Repeat By" value={schedule.repeat_by} />
            <SchedDetail label="Days of Week" value={schedule.days_of_week} />
          </Stack>
        </Box> 
        <Box sx={{mx:"auto", mt:"10px"}}>
          <Stack sx={{mt:"1rem"}} direction="row" spacing={2}> 
            <SchedDetail label="Start Date" value={schedule.start_date} />
            <SchedDetail label="End Date" value={schedule.end_date} />
          </Stack>
        </Box>
        <Box sx={{mx:"auto", mt:"1rem"}}>
          <SchedDetail label="Note" value={schedule.note} />
        </Box>
        <Box sx={{mx:"auto", mt:"1rem"}}>
          <SchedDetail label="Users" value={schedule.classroom.users?.map((row, rowIndex) => (
            <ListItem
              key={row.id}
            >
              <ListItemAvatar>
                <Avatar alt={row.name} src={row.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={row.name}
                secondary={row.school_id}
              />
            </ListItem>
          ))}>
          </SchedDetail>
        </Box>
      </Box>
      )}

      
    </Page>
  )
}

export default ScheduleShow;