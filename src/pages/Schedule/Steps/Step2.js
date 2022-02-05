import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useDispatch, useSelector } from "react-redux"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Skeleton from '@mui/material/Skeleton';
import {
  getAdminFacilities,
  clearErrors,
} from "../../../actions/facilityActions"
import {
  getAdminSubjects
} from "../../../actions/subjectActions"

export default function Step2({history}) {
  const [type, setType] = useState('');
  const [facility, setFacility] = useState('');
  const [subject, setSubject] = useState('');
  const [classroom, setClassroom] = useState({});
  const [classrooms, setClassrooms] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [isEndOfSem, setIsEndOfSem] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [repeatBy, setRepeatBy] = useState('');

  const dispatch = useDispatch()

  const { loading, facilities, count, error } = useSelector((state) => state.facilities)
  const { loading: loadingSubjects, subjects, count: countSubjects, error: errorSubjects } = useSelector((state) => state.subjects)

  const types = ['Classroom', 'Office', 'Others']
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  useEffect(() => {
    dispatch(getAdminFacilities(0, 100))
    dispatch(getAdminSubjects(0, 100))
    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }
  }, [dispatch, history, error, errorSubjects ])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth required sx={{ my: 2 }}>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={type}
          label="Type"
          onChange={(e) => setType(e.target.value)}
        >
          {types.map((type, index) => (
            <MenuItem value={++index} key={index}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
    
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Grid container rowSpacing={3} spacing={2}>

          {countSubjects ? (
            <Grid item xs={subject ? 9:12}>
              <FormControl fullWidth required>
                <InputLabel id="type-select-label">Subject</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={subject}
                  label="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {subjects.map(item => (
                    <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Skeleton animation="wave" height={100} />
            </Grid>
          )}
          {subject && (
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Code"
                variant="outlined"
                fullWidth
                disabled
                value={subjects.find(item => item.id === subject).code}
              />
            </Grid>
          )}

          {count ? (
            <Grid item xs={facility ? 9:12}>
              <FormControl fullWidth required>
                <InputLabel id="facility-select-label">Facility</InputLabel>
                <Select
                  labelId="facility-select-label"
                  id="facility-select"
                  value={facility}
                  label="Type"
                  onChange={(e) => setFacility(e.target.value)}
                  required
                >
                  {facilities.map(item => (
                    <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Skeleton animation="wave" height={100} />
            </Grid>
          )}
          {facility && (
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Capacity"
                variant="outlined"
                fullWidth
                disabled
                value={facilities.find(item => item.id === facility).capacity}
              />
            </Grid>
          )}
          
          <Grid item xs={6}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(val) => setStartTime(val)}
              renderInput={(params) => <TextField required fullWidth {...params} />}
            />
          </Grid>
          <Grid item xs={6}>
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(val) => setEndTime(val)}
              renderInput={(params) => <TextField required fullWidth {...params} />}
            />
          </Grid>
          <Grid item xs={isRecurring ? 6 : 12}>
            <FormControlLabel control={<Switch 
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked) }
            />} label="Recurring" />
          </Grid>
          {isRecurring && (
            <Grid item xs={6}>
              <FormControlLabel control={<Switch 
                checked={isEndOfSem}
                onChange={(e) => setIsEndOfSem(e.target.checked) }
              />} label="Until the end of Semester" />
            </Grid>
          )}
          <Grid item xs={6}>
            <MobileDatePicker
              label="Start Date"
              inputFormat="MM/dd/yyyy"
              value={startDate}
              onChange={(val) => setStartDate(val)}
              renderInput={(params) => <TextField required fullWidth {...params} />}
            />
          </Grid>
          {(isRecurring && !isEndOfSem) && (
            <Grid item xs={6}>
              <MobileDatePicker
                label="End Date"
                inputFormat="MM/D/yyyy"
                value={endDate}
                onChange={(val) => setEndDate(val)}
                renderInput={(params) => <TextField required fullWidth {...params} />}
                required={isRecurring}
              />
            </Grid>          
          )}
          {isRecurring && (
            <Grid item xs={6}>
              <FormControl required={isRecurring} fullWidth>
                <InputLabel id="daysOfWeek-select-label">Days of Week</InputLabel>
                <Select
                  labelId="daysOfWeek-select-label"
                  id="daysOfWeek-select-label"
                  multiple
                  value={daysOfWeek}
                  onChange={(e) => setDaysOfWeek(e.target.value)}
                  input={<OutlinedInput id="select-multiple-chip" label="Days of Week" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} color="primary" />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name.replace(/(^|\s)\S/g, letter => letter.toUpperCase())}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>        
          )}
          {isRecurring && (
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel id="repeatBy-select-label">Repeat by</InputLabel>
                <Select
                  labelId="repeatBy-select-label"
                  id="repeatBy-select"
                  value={repeatBy}
                  label="Type"
                  onChange={(e) => setRepeatBy(e.target.value)}
                  required={isRecurring}
                >
                  {['daily', 'weekly', 'monthly'].map(item => (
                    <MenuItem value={item} key={item}>
                      {item.replace(/(^|\s)\S/g, letter => letter.toUpperCase())}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>     
          )}
        </Grid>
      </LocalizationProvider>
    </Box>
  );
}