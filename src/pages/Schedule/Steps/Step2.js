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
import Button from '@mui/material/Button';
import API from 'config/api'
import TypeCards from './TypeCards';
import FormHelperText from '@mui/material/FormHelperText';
import { useAuth } from 'base-shell/lib/providers/Auth'
import ScheduleCalendar from '../ScheduleCalendar';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)

export default function Step2({history, activeStep, setActiveStep}) {
  const [type, setType] = useState(1);
  const [errors, setErrors] = useState('');
  const [selected, setSelected] = useState('');
  const { auth } = useAuth()
  const [types, setTypes] = useState([
    {
      value: 1,
      label: 'Classroom',
      image: '/types/professor.svg'   
    },
    {
      value: 2,
      label: 'Office',
      image: '/types/working.svg'    
    },
    {
      value: 3,
      label: 'Others',
      image: '/types/more.svg'   
    },
  ]);
  const [facility, setFacility] = useState('');
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [classroom, setClassroom] = useState({});
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [startTime, setStartTime] = useState(dayjs(new Date(0, 0, 0, 7, 0)));
  const [endTime, setEndTime] = useState(dayjs(new Date(0, 0, 0, 15, 0)));
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(startDate.add(1, 'year'));
  const [isRecurring, setIsRecurring] = useState(false);
  const [isEndOfSem, setIsEndOfSem] = useState(false);
  const [hasTimeConflict, setHasTimeConflict] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [repeatBy, setRepeatBy] = useState('');

  const dispatch = useDispatch()

  const { loading, facilities, count, error } = useSelector((state) => state.facilities)
  const { schedule } = useSelector((state) => state.newSchedule)

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

  async function getAvailableFacilities () {
    try {
      const params = {
        start_time: startTime.format('HH:mm'),
        end_time: endTime.format('HH:mm'),
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        type: types.find(item => item.value === type)?.label?.toLowerCase()
      }
      const {data} = await API.get('availability/facility', {params})
      await setFilteredFacilities(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const maxTime = () => {
    const max = dayjs(new Date(0, 0, 0, 22, 0))

    if (endTime.isAfter(max) || startTime.add(8, 'hour').isAfter(max)) {
      return max
    }
    
    return startTime.add(8, 'hour')
  }

  const oneDayDiff = () => {
    if (endDate && endDate.diff(startDate, 'day') <= 1) {
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
    setErrors('')
    saveData()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function disableWeekends(date) {
    return date.day() === 0 || date.day() === 6;
  }

  function getTimeMin (time) {
    const tempDate = new Date()
    const timeSplit = time.split(':')
    tempDate.setHours(parseInt(timeSplit[0]))
    tempDate.setMinutes(parseInt(timeSplit[1]))
    return tempDate
  }

  const fetchData = (schedule) => {

    if (schedule.facility_id && schedule.facility_type) {
      setType(schedule.facility_type)
      setFacility(schedule.facility_id)
      setFilteredFacilities(facilities.filter(item => item.id === schedule.facility_id))
    } else if(schedule.facility) {
      setType(types.find(item => item.label.toLowerCase() === schedule.facility.type.toLowerCase())?.value)
      setFacility(schedule.facility.id)
      setFilteredFacilities(facilities.filter(item => item.id === schedule.facility.id))
    }
    setStartTime(schedule.start_at ? dayjs(getTimeMin(schedule.start_at)) : dayjs(new Date(0, 0, 0, 7, 0)))
    setEndTime(schedule.end_at ? dayjs(getTimeMin(schedule.end_at)) : startTime.add(8, 'hour'))
    setStartDate(schedule.start_date ? dayjs(schedule.start_date) : dayjs(new Date()))
    if (schedule.is_recurring) {
      setEndDate(dayjs(schedule.end_date))
    }
    setIsRecurring(!!schedule.is_recurring)

    setIsEndOfSem(schedule.is_end_of_sem? !!schedule.is_end_of_sem : false)
    setDaysOfWeek(schedule.days_of_week ? typeof schedule.days_of_week === 'string' ? (schedule.days_of_week).split(',') : schedule.days_of_week  : [])
    setRepeatBy(schedule.repeat_by ? schedule.repeat_by : '')
  }

  useEffect(() => {
    if (!count) {
      dispatch(getAdminFacilities(0, 1000))
    } else if (facility && filteredFacilities.length === 0) {
      setFilteredFacilities(facilities.filter(item => item.id === facility))
    }

    if (schedule) {
      fetchData(schedule)
    }

    if (schedule && schedule.type === 'personal') {
      setTypes([
        {
          value: 2,
          label: 'Office',
          image: '/types/working.svg'    
        },
        {
          value: 3,
          label: 'Others',
          image: '/types/more.svg'   
        },
      ])
      setType(2)
    }

    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }
  }, [dispatch, history, error, schedule, count])

  let minStartTime = dayjs(new Date(0, 0, 0, 7, 0))
  if (filteredSchedules.length > 0) {
    const endAtObj = dayjs(filteredSchedules[0]?.end_at)
    if (endAtObj.hour() > 8) {
      minStartTime = dayjs(filteredSchedules[0]?.end_at)  
    }
  }

  function checkTimeConflict () {
    if (facility && startTime && endTime) {
      console.log(filteredSchedules.find(item => {
        const startAt = new Date(0, 0, 0, parseInt(item.start_at.split(':')[0]), parseInt(item.start_at.split(':')[1]), 0)
        const endAt = new Date(0, 0, 0, parseInt(item.end_at.split(':')[0]), parseInt(item.end_at.split(':')[1]), 0)
        return (startTime.hour() >= startAt.getHours() && startTime.minute() >= startAt.getMinutes()) ||
        (endTime.hour() <= endAt.getHours() && endTime.minute() <= endAt.getMinutes()) 
      }))
      if(filteredSchedules.find(item => {
        const startAt = new Date(0, 0, 0, parseInt(item.start_at.split(':')[0]), parseInt(item.start_at.split(':')[1]), 0)
        const endAt = new Date(0, 0, 0, parseInt(item.end_at.split(':')[0]), parseInt(item.end_at.split(':')[1]), 0)
        return (startTime.hour() >= startAt.getHours() && startTime.minute() >= startAt.getMinutes()) ||
        (endTime.hour() <= endAt.getHours() && endTime.minute() <= endAt.getMinutes()) 
      })) {
        setHasTimeConflict(true)
      } else {
        setHasTimeConflict(false)
      }
    } else {
      setHasTimeConflict(false)
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <TypeCards types={types} type={type} setType={setType} />
      <form onSubmit={submit}>      
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Grid container rowSpacing={3} spacing={2}>
            {count ? (
              <Grid item xs={facility ? 9:12}>
                {type && (
                  <FormControl fullWidth required >
                    <InputLabel id="facility-select-label">Facility</InputLabel>
                    <Select
                      labelId="facility-select-label"
                      id="facility-select"
                      value={facility}
                      label="Type"
                      onChange={(e) => {
                        setErrors('')
                        setFacility(e.target.value)
                      }}
                      error={!!errors.facility}
                      aria-describedby="facility-helper-text" 
                      required
                    >
                      {type ? facilities.filter(item => item.type.toLowerCase() === types.find(item => item.value === type)?.label.toLowerCase()).map(item => (
                        <MenuItem value={item.id} key={item.id}>{item.name} {item.schedules ? `[${item.schedules.length} schedules]` : '[no schedule]'}</MenuItem>
                      )) : ''}
                    </Select>
                    {errors && errors.facility && (
                      <FormHelperText error id="facility-helper-text">{errors.facility}</FormHelperText>                    
                    )}
                  </FormControl>
                )}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Skeleton animation="wave" height={100} />
              </Grid>
            )}
            {(count && facility && !errors) && (
              <Grid item xs={3}>
                <TextField
                  label="Capacity"
                  fullWidth
                  disabled
                  value={facilities.find(item => item.id === facility)?.capacity}
                />
              </Grid>
            )} 

            {(facilities && facility) && (
              <ScheduleCalendar 
                schedule={schedule}
                startDate={startDate}
                endDate={endDate}
                isRecurring={isRecurring}
                setSelected={(val)=> {
                setSelected(val)
                setFilteredSchedules(facilities
                  .find(item => item.id === facility).schedules
                  .filter(item => 
                    dayjs(val.dateStr).isSameOrAfter(item.start_date) &&
                    dayjs(val.dateStr).isSameOrBefore(item.end_date)
                  )
                  .sort((curr, next) => (
                    parseInt(curr.start_at.split(':')[0]) - parseInt(next.start_at.split(':')[0])
                  )))
                setStartDate(dayjs(val.dateStr))
              }} schedules={facilities.find(item => item.id === facility).schedules} />
            )}

            {selected && (
              <Grid item xs={12}>
                <Typography>Schedules of {facilities.find(item => item.id === facility)?.name} on {selected.dateStr}</Typography>
                <ul sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {
                    filteredSchedules
                      .map(item => (
                        <li key={item.id} >
                          {`${item.start_at} to ${item.end_at}`}
                        </li>
                      ))
                  }
                </ul>
              </Grid>
            )}

            <Grid item xs={6}>
              <TimePicker
                label="Start Time"
                minTime={minStartTime}
                maxTime={dayjs(new Date(0, 0, 0, 21, 0))}
                value={startTime}
                onChange={(val) => {
                  setStartTime(val)
                  setHasTimeConflict(false)
                  checkTimeConflict()
                }}
                renderInput={(params) => 
                  <TextField
                    helperText={hasTimeConflict ? "Conflicting with existing schedules." : "Earliest time to set is 7:00 A.M."}
                    required
                    fullWidth
                    error={hasTimeConflict}
                    {...params} />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="End Time"
                minTime={startTime}
                maxTime={maxTime()}
                value={endTime}
                onChange={(val) => {
                  setEndTime(val)
                  setHasTimeConflict(false)
                  checkTimeConflict()
                }}
                renderInput={(params) => 
                  <TextField
                    helperText={hasTimeConflict ? "Conflicting with existing schedules." : "Maximum time rage is 8 hours. Maximum time to set is 10:00 P.M."}
                    required
                    fullWidth
                    error={hasTimeConflict}
                    {...params} />
                }
              />
            </Grid>
            {(auth.role !== 4 && schedule.type !== 'personal') && (
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
            )}
            {isRecurring && (
              <Grid item xs={6}>
                <FormControlLabel control={<Switch 
                  checked={isEndOfSem}
                  onChange={(e) => {
                    setIsEndOfSem(e.target.checked)
                    setEndDate(dayjs('8/30/2022'))
                  }}
                />} label="Until the end of Semester" />
              </Grid>
            )}
            <Grid item xs={isRecurring ? 6:12}>
              <MobileDatePicker
                label="Start Date"
                inputFormat="MM/D/YYYY"
                minDate={dayjs(new Date())}
                maxDate={isRecurring ? endDate : null}
                value={startDate}
                shouldDisableDate={auth.role === 4 ? disableWeekends : null}
                onChange={(val) => {
                  oneDayDiff()
                  setStartDate(val)
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
                  shouldDisableDate={auth.role === 4 ? disableWeekends : null}
                  onChange={(val) => {
                    oneDayDiff()
                    setEndDate(val)
                  }}
                  renderInput={(params) => <TextField required fullWidth {...params} />}
                  required={isRecurring}
                />
              </Grid>          
            )}
            {isRecurring && endDate && (
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
                      if (endDate && endDate.diff(startDate, 'month') < 1) {
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
            {isRecurring && repeatBy && repeatBy === 'weekly' && (
              <Grid item xs={6}>
                <FormControl required={isRecurring && repeatBy && repeatBy === 'weekly'} fullWidth>
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