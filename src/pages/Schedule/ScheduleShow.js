import React, {useState, useEffect} from "react";
import { Stack } from "@mui/material";
import SchedDetail from "components/Modal/SchedDetail";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Page from 'material-ui-shell/lib/containers/Page';
import Skeleton from '@mui/material/Skeleton';
import API from '../../config/api'
import Container from '@mui/material/Container';
import { useAuth } from 'base-shell/lib/providers/Auth'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import AbsentForm from "./AbsentForm";
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import Divider from '@mui/material/Divider';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import Button from '@mui/material/Button';

const ScheduleShow = () => {
  const loc = window.location.pathname
  const id = loc.substring(loc.lastIndexOf('/') + 1);
  const [success, setSuccess] = useState(false)
  const [schedule, setSchedule] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [batch, setBatch] = useState('')
  const { auth } = useAuth()
  const { openDialog } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  async function getSchedule() {
    try {
      const {data} = await API.get(`schedule/${id}`)
      console.log(data)
      await setSchedule(data.data)
    } catch (error) {
      setSchedule('')
    }
  }

  async function postApprove(batch) {
    try {
      await API.post(`batch/${batch}/approve`)
        .then(res => {
          if (res.status === 200) {
            enqueueSnackbar('Absent approval successfully sent.', {
              variant: 'success',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            })
            getSchedule()
          }
        })
        .catch(err => {
          enqueueSnackbar('Sending Absent Approval failed.', {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          })
        })
    } catch (error) {
    
    }
  }

  function getAction (batch) {
    if ((auth.role === 2 || auth.role === 1) && batch.is_absent && batch.note && !batch.is_approved) {
      return (
        <IconButton
          edge="end"
          aria-label="Approve"
          onClick={() => {
            openDialog({
              title: "Approve Absent Reason",
              message: `Are you sure you want to approve the reason of ${batch.user.name}? Note: ${batch.note}`,
              action: "Approve",
              handleAction: (handleClose) => {
                postApprove(batch.id)
                handleClose()
              },
            })
          }}
        >
          <CheckCircleOutlineOutlinedIcon />
        </IconButton>
      )
    } else if (auth.id === batch.user.id && batch.is_absent && !batch.is_approved) {
      return (
        <IconButton onClick={() => {
          setOpenModal(true)
          setBatch(batch.id)
        }} edge="end" aria-label="Leave Request">
          <MailOutlineOutlinedIcon />
        </IconButton>
      )    
    }
  }

  function getItemIcon (batch) {
    if (batch.is_absent && batch.is_approved) {
      return (
        <VerifiedOutlinedIcon color="info" />
      )
    } else if (!batch.is_absent) {
      return (
        <DoneOutlinedIcon color="success" />
      )
    } else if (batch.is_absent && !batch.is_approved) {
      return (
        <CloseOutlinedIcon color="warning" />
      )
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
        <Container maxWidth="sm" sx={{ mx: "auto"}}>
          <Skeleton variant="rectangular" height={200} animation="wave" sx={{ my: 2  }} />
          <Skeleton variant="rectangular" height={118} animation="wave" sx={{ my: 2  }} />
          <Skeleton variant="text" sx={{ my: 2  }} />
        </Container>
      ) :(  
        <Container maxWidth="lg" sx={{ mx: "auto"}}>
          <Box sx={{ p: '1rem' }}>
            <Box sx={{mx:"auto", mt:"1rem"}}>
              <SchedDetail label="Created by" value={schedule.user?.name} /> 
            </Box>
            <Box sx={{mx:"auto", mt:"1rem"}}>
              <SchedDetail label="Title" value={schedule.title} />
            </Box> 
            <Box sx={{mx:"auto", mt:"1rem"}}>
              <SchedDetail label="Type" value={schedule.type} />
            </Box> 
            <Box sx={{mx:"auto", mt:"1rem"}}>
              <SchedDetail label="Classroom" value={schedule.classroom?.name} />
            </Box> 
            <Box sx={{mx:"auto", mt:"1rem"}}>
              <SchedDetail label="Facility" value={schedule.facility?.name} />
            </Box>
            <Box sx={{mx:"auto", mt:"1rem"}}>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <SchedDetail label="Start Time" value={schedule.start_at} />
                </Grid>
                <Grid item xs={4}>
                  <SchedDetail label="End Time" value={schedule.end_at} />
                </Grid>
              </Grid>
            </Box>
             <Box sx={{mx:"auto", mt:"1rem"}}>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={4}>
                  <SchedDetail label="Start Date" value={schedule.start_date} />
                </Grid>
                <Grid item xs={4}>
                  <SchedDetail label="End Date" value={schedule.end_date} />
                </Grid>
              </Grid>
            </Box>
            {schedule.is_recurring && (
              <Box sx={{mx:"auto", mt:"1rem"}}>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={4}>
                    <SchedDetail label="Repeat By" value={schedule.repeat_by} />
                  </Grid>
                  <Grid item xs={4}>
                  <SchedDetail label="Days of Week" value={typeof schedule.days_of_week === 'string'? schedule.days_of_week : schedule.days_of_week.join(', ')} />
                  </Grid>
                </Grid>
              </Box>           
            )}
            <Box sx={{mx:"auto", mt:"1rem"}}>
              <SchedDetail label="Note" value={schedule.note} />
            </Box>
            {schedule.attachment && (
              <Box sx={{mx:"auto", mt:"1rem"}}>
                <a href={schedule.attachment} style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer">
                  <Button variant="outline" endIcon={<LaunchOutlinedIcon />}>
                    Open attachment
                  </Button>
                </a>
              </Box>
            )}
            <Container maxWidth="lg" sx={{ mt: "2rem" }}>
              <Box sx={{mx:"auto", mt:"1rem"}}>
                <SchedDetail label="Users" value={schedule.batches?.map((row, rowIndex) => (
                  <ListItem
                    key={row.user.id}
                    secondaryAction={getAction(row)}
                  >
                    <ListItemIcon>
                      {getItemIcon(row)}
                    </ListItemIcon>
                    <ListItemAvatar>
                      <Avatar alt={row.user.name} src={row.user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={row.user.name}
                      secondary={`Batch: ${row.batch}`}
                    />
                  </ListItem>
                ))}>
                </SchedDetail>
              </Box>
            </Container>
          </Box>
        </Container>    
      )}

      <AbsentForm successfullySent={() => {
        getSchedule()
      }} batch={batch} openModal={openModal} setOpenModal={setOpenModal} />
    </Page>
  )
}

export default ScheduleShow;