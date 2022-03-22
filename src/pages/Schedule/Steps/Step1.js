import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux"
import Skeleton from '@mui/material/Skeleton';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import {
  getClassrooms,
  clearErrors,
} from "../../../actions/classroomActions"
import { NEW_SCHEDULE_REQUEST, CLEAR_DATA } from "../../../constants/scheduleConstants"
import PrevNextButtons from './PrevNextButtons';
import { useNavigate } from "react-router-dom";
import TypeCards from './TypeCards';

export default function Step1({history, activeStep, setActiveStep}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [classroom, setClassroom] = useState({});
  const [error, setError] = useState({});

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { loading, classrooms, count } = useSelector((state) => state.classrooms)
  const { schedule } = useSelector((state) => state.newSchedule)

  const types = [
    {
      value: 'whole_class',
      label: 'Create a schedule for the whole class',
      image: '/types/learning.svg'   
    },
    {
      value: 'course_related',
      label: 'Course Subject Related',
      image: '/types/education.svg'    
    },
    {
      value: 'personal',
      label: 'Personal Visit',
      image: '/types/location.svg'   
    },
  ]

  const submit = (event) => {
    event.preventDefault()
    dispatch({
      type: NEW_SCHEDULE_REQUEST,
      payload: {
        ...schedule,
        type,
        classroom_id: classroom,
        classroom_name: classrooms.find(item => item.id === classroom)?.name,
        title,
        user_id: 1
      }
    })
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  

  useEffect(() => {
    if (!count) {
      dispatch(getClassrooms())
    }
    if (schedule) {
      setTitle(schedule.title)
      setType(schedule.type ? schedule.type : 'whole_class')
      setClassroom(schedule.classroom_id)
    }
  }, [dispatch, history, schedule, count])

  return (
    <Box sx={{ minWidth: 120 }}>
      <TypeCards types={types} type={type} setType={setType} />
      <form onSubmit={submit}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        {count ? (
          <FormControl fullWidth required={type !== 'personal'}  margin="normal">
            <InputLabel id="classroom-select-label">Classroom</InputLabel>
            <Select
              labelId="classroom-select-label"
              id="classroom-select"
              value={classroom}
              label="Classroom"
              onChange={(event) => setClassroom(event.target.value)}
              m={2}
            >
              {classrooms.map(item => (
                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}

        <PrevNextButtons setActiveStep={setActiveStep} handleBack={() => {
           dispatch({type: CLEAR_DATA})
          navigate(-1)
        }} isFirst={true} text="Next" />
      </form>
    </Box>
  );
}