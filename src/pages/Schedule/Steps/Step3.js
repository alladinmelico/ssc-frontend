import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from "react-redux"
import Skeleton from '@mui/material/Skeleton';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from "@mui/material";
import {
  getUsers,
  getAdminUsers,
} from "../../../actions/userActions"
import { NEW_SCHEDULE_REQUEST } from "../../../constants/scheduleConstants"
import PrevNextButtons from './PrevNextButtons';
import { Grid, Typography } from '@mui/material';

export default function Step3({history, activeStep, setActiveStep}) {
  const [hasUser, setHasUser] = useState(false);
  const [classroom, setClassroom] = useState('');
  const [facilityCapacity, setFacilityCapacity] = useState(0);
  const [toAddUser, setToAddUser] = useState({name: ''});
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [error, setError] = useState({});

  const dispatch = useDispatch()

  const { schedule } = useSelector((state) => state.newSchedule)
  const { users, count } = useSelector((state) => state.users)

  const submit = (event) => {
    event.preventDefault()
    saveData()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  
  const saveData = () => {
    dispatch({
      type: NEW_SCHEDULE_REQUEST,
      payload: {
        ...schedule,
        users: batches.map(batch => batch.map(item => item.id))
      }
    })
  }

  function sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
          const chunk = arr.slice(i, i + chunkSize);
          res.push(chunk);
      }
      return res;
  }

  function shuffleBatches () {
    const temp = users.sort(() => Math.random() - 0.5)
    setBatches(sliceIntoChunks(temp, facilityCapacity))  
  }

  function addUser () {
    const temp = [...batches]
    const flatten = temp.flat()
    if (toAddUser && !flatten.find(item => item.id === toAddUser.id)) {
      if (temp.length) {
        if (selectedBatch) {
          if (temp[selectedBatch].length < facilityCapacity) {
            temp[selectedBatch].push(toAddUser)
          }
        } else {
          const index = temp.findIndex(i => i.length < facilityCapacity)
          if (index >= 0) {
            temp[index].push(toAddUser)
          } else {
            temp.push([toAddUser])
          }
        }        
      } else {
        temp.push([toAddUser])
      }
      setBatches([...temp])
    }
  }

  function removeItem(row, index) {
    const tempArr = [...batches]
    tempArr[row].splice(index, 1)
    setBatches([...tempArr])
  }

  function clearFields() {
    setSelectedBatch('')
    setToAddUser({name: ''})
  }

  useEffect(() => {
    if (count || count === 0) {
      if (schedule.users) {
        setBatches(sliceIntoChunks(schedule.users, facilityCapacity))
      } else if (schedule && schedule.type === 'whole_class') {
        setBatches(sliceIntoChunks(users, facilityCapacity))
      }
    } else {
      dispatch(getUsers(schedule.classroom_id))
    }

    if (schedule) {
      setHasUser(schedule.type === 'whole_class')
      setClassroom(schedule.classroom_name)
      setFacilityCapacity(schedule.facility_capacity)
    }
  }, [dispatch, history, schedule, count])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControlLabel control={
        <Switch 
          checked={hasUser}
          onChange={(e) => setHasUser(e.target.checked)}
          disabled={schedule && schedule.type === 'whole_class'}
        />} label="Users involved"
      />
      
      <form onSubmit={submit}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 5 }} >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="overline" >Classroom</Typography>
            <Typography variant="overline" sx={{ fontWeight: 'bold' }}>{classroom}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="overline" >Capacity</Typography>
            <Typography variant="overline" sx={{ fontWeight: 'bold' }}>{facilityCapacity}</Typography>
          </Box>
        </Box>

        
        {count || count === 0 ? (
          <Stack direction="row" spacing={2}>
            {count === 0 ? (
              <Typography variant="h5">No user added to "{schedule.classroom_name}" classroom.</Typography>
            ) : (
              <Stack direction="row" spacing={2}>            
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="add-user-search"
                  value={toAddUser}
                  getOptionLabel={(item) => item.name}
                  onChange={(event, newVal) => setToAddUser(newVal)}
                  options={users}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Add User" placeholder="Select user to add" />}
                />
                <FormControl fullWidth>
                  <InputLabel id="batch-select-label">Batch</InputLabel>
                  <Select
                    labelId="batch-select-label"
                    id="batch-select"
                    value={selectedBatch}
                    label="Batch"
                    onChange={(e) => setSelectedBatch(e.target.value)}
                  >
                    {batches.map((item, index) => (
                      <MenuItem value={index} key={index}>{index}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Stack>
                  <Button size='small' onClick={() => addUser()}>Add</Button>
                  <Button size='small' onClick={() => clearFields()}>Clear</Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        ) : 
          <Skeleton animation="wave" height={100} />
        }
        

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '1rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="overline" >Students in this Classroom</Typography>
            <small>Students are separated on batches.</small>
            <small>They will be scheduled alternately until the end of schedule.</small>
            <small>Each batch is limited by the capacity of the room</small>
          </Box>
          <Button color="primary" onClick={shuffleBatches}>Shuffle</Button>
        </Box>

        
        {hasUser && (
          <Grid container>
            {batches.map((batch, index) => (
              <Grid item xs={6} key={index}>
              
                <Box>
                  <List dense 
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Batch {index}
                      </ListSubheader>
                    }
                  >
                    {batch.map((row, rowIndex) => (
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
                        <Box edge="end">
                          <IconButton edge="end" aria-label="delete" onClick={() => removeItem(index, rowIndex)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            ))}
          </Grid>        
        )}

        <PrevNextButtons handleBack={() => {
          saveData()
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }} isActive={true} text="Next" />
      </form>
    </Box>
  );
}