import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import SchedDetail from "components/Modal/SchedDetail";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

const ScheduleShow = ({modalClosed, schedule}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (schedule && schedule.id) {
      setOpenModal(true)
    }
  }, [schedule])

  return (
    <ShowModal
      title="Schedule Details"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
    >
      <Box>
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
          <SchedDetail label="Users" value={schedule.users.map((row, rowIndex) => (
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
    </ShowModal>
  )
}

export default ScheduleShow;