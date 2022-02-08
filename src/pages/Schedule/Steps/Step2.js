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
import PrevNextButtons from './PrevNextButtons';
import { NEW_SCHEDULE_REQUEST } from "../../../constants/scheduleConstants"
import {
  getAdminFacilities,
  clearErrors,
} from "../../../actions/facilityActions"
const dayjs = require('dayjs')

export default function Step2({history, activeStep, setActiveStep}) {
  const [type, setType] = useState('');
  const [facility, setFacility] = useState('');
  const [classroom, setClassroom] = useState({});
  const [classrooms, setClassrooms] = useState([]);
  const [startTime, setStartTime] = useState(dayjs(new Date(0, 0, 0, 7, 0)));
  const [endTime, setEndTime] = useState(startTime.add(8, 'hour'));
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(startDate.add(1, 'year'));
  const [isRecurring, setIsRecurring] = useState(false);
  const [isEndOfSem, setIsEndOfSem] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [repeatBy, setRepeatBy] = useState('');

  const dispatch = useDispatch()

  const { loading, facilities, count, error } = useSelector((state) => state.facilities)
  const { schedule } = useSelector((state) => state.newSchedule)

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

  const maxTime = () => {
    const max = dayjs(new Date(0, 0, 0, 22, 0))

    if (endTime.isAfter(max) || startTime.add(8, 'hour').isAfter(max)) {
      return max
    }
    
    return startTime.add(8, 'hour')
  }

  const oneDayDiff = () => {
    if (endDate.diff(startDate, 'day') <= 1) {
      setIsRecurring(false)
    }
  }

  const saveData = () => {
    dispatch({
      type: NEW_SCHEDULE_REQUEST,
      payload: {
        ...schedule,
        facility_type: type,
        facility_id: facility,
        start_at: startTime.format('HH:mm'),
        end_at: endTime.format('HH:mm'),
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        is_recurring: isRecurring,
        is_end_of_sem: isEndOfSem,
        days_of_week: daysOfWeek,
        repeat_by: repeatBy,
        facility_capacity: facility ? facilities.find(item => item.id === facility).capacity : 0
      }
    })
  }

  const submit = (event) => {
    event.preventDefault()
    saveData()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function getTimeMin (time) {
    const tempDate = new Date()
    const timeSplit = time.split(':')
    tempDate.setHours(parseInt(timeSplit[0]))
    tempDate.setMinutes(parseInt(timeSplit[1]))
    return tempDate
  }

  const fetchData = (schedule) => {
    if (schedule.facility) {
      setType(schedule.facility ? (types.findIndex(item => item === schedule.facility.type) + 1) : '')
      setFacility(schedule.facility ? schedule.facility.id : '')
    } else {
      setType(schedule.facility_type ? schedule.facility_type : '')
      setFacility(schedule.facility_id ? schedule.facility_id : '')
    }
    setStartTime(schedule.start_at ? dayjs(getTimeMin(schedule.start_at)) : dayjs(new Date(0, 0, 0, 7, 0)))
    setEndTime(schedule.end_at ? dayjs(getTimeMin(schedule.end_at)) : startTime.add(8, 'hour'))
    setStartDate(schedule.start_date ? dayjs(schedule.start_date) : dayjs(new Date()))
    setEndDate(schedule.end_date ? dayjs(schedule.end_date) : startDate.add(1, 'year'))
    setIsRecurring(schedule.is_recurring ? !!schedule.is_recurring : false)
    setIsEndOfSem(schedule.is_end_of_sem? !!schedule.is_end_of_sem : false)
    setDaysOfWeek(schedule.days_of_week ? schedule.days_of_week : [])
    setRepeatBy(schedule.repeat_by ? schedule.repeat_by : '')
  }

  useEffect(() => {
    if (!count) {
      dispatch(getAdminFacilities(0, 100))
    }

    if (schedule) {
      fetchData(schedule)
    }

    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }
  }, [dispatch, history, error, schedule])

  return (
    <Box sx={{ minWidth: 120 }}>
      <form onSubmit={submit}>
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

            {count ? (
              <Grid item xs={facility ? 9:12}>
                {type && (
                  <FormControl fullWidth required>
                    <InputLabel id="facility-select-label">Facility</InputLabel>
                    <Select
                      labelId="facility-select-label"
                      id="facility-select"
                      value={facility || null}
                      label="Type"
                      onChange={(e) => setFacility(e.target.value)}
                      required
                    >
                      {type ? facilities.filter(item => item.type.toLowerCase() === types[type - 1].toLowerCase()).map(item => (
                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                      )) : ''}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Skeleton animation="wave" height={100} />
              </Grid>
            )}
            {(count && facility) && (
              <Grid item xs={3}>
                <TextField
                  label="Capacity"
                  fullWidth
                  disabled
                  defaultValue={facilities.find(item => item.id === facility)?.capacity}
                />
              </Grid>
            )}
            
            <Grid item xs={6}>
              <TimePicker
                label="Start Time"
                minTime={dayjs(new Date(0, 0, 0, 7, 0))}
                maxTime={dayjs(new Date(0, 0, 0, 21, 0))}
                value={startTime}
                onChange={(val) => setStartTime(val)}
                helper
                renderInput={(params) => <TextField helperText="Earliest time to set is 7:00 A.M." required fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="End Time"
                minTime={startTime}
                maxTime={maxTime()}
                value={endTime}
                onChange={(val) => setEndTime(val)}
                renderInput={(params) => <TextField helperText="Maximum time rage is 8 hours. Maximum time to set is 10:00 P.M." required fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={isRecurring ? 6 : 12}>
              <FormControlLabel control={<Switch 
                checked={isRecurring}
                onChange={(e) => {
                  if (e.target.checked) {
                    setEndDate(startDate.add(3, 'day'))
                  }
                  return setIsRecurring(e.target.checked) 
                }}
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
                inputFormat="MM/D/YYYY"
                minDate={dayjs(new Date())}
                maxDate={endDate}
                value={startDate}
                onChange={(val) => {
                  oneDayDiff()
                  return setStartDate(val)
                }}
                renderInput={(params) => <TextField required fullWidth {...params} />}
              />
            </Grid>
            {(isRecurring && !isEndOfSem) && (
              <Grid item xs={6}>
                <MobileDatePicker
                  label="End Date"
                  inputFormat="MM/D/YYYY"
                  minDate={startDate}
                  value={endDate}
                  onChange={(val) => {
                    oneDayDiff()
                    setEndDate(val)
                  }}
                  renderInput={(params) => <TextField required fullWidth {...params} />}
                  required={isRecurring}
                />
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
                    label="Repeat by"
                    onChange={(e) => setRepeatBy(e.target.value)}
                    required={isRecurring}
                  >
                    {['daily', 'weekly', 'monthly'].filter(item => {
                      if (endDate.diff(startDate, 'month') < 1) {
                        if (endDate.diff(startDate, 'week') < 1) {
                          return item === 'daily'
                        }
                        return item !== 'monthly'
                      }
                      return true
                    }).map(item => (
                      <MenuItem value={item} key={item}>
                        {item.replace(/(^|\s)\S/g, letter => letter.toUpperCase())}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
            
          </Grid>
        </LocalizationProvider>

        <PrevNextButtons handleBack={() => {
          saveData()
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }} isActive={true} text="Next" />
      </form>
    </Box>
  );
}