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
import {
  getAdminClassrooms,
  clearErrors,
} from "../../../actions/classroomActions"

export default function Step1({history}) {
  const [type, setType] = useState('');
  const [classroom, setClassroom] = useState({});

  const dispatch = useDispatch()

   const { loading, classrooms, count, error } = useSelector((state) => state.classrooms)

  const types = [
    {
      value: 'whole_class',
      label: 'Create a schedule for the whole class'    
    },
    {
      value: 'course_related',
      label: 'Course Subject Related'    
    },
    {
      value: 'personal',
      label: 'Personal Visit'    
    },
  ]

  useEffect(() => {
    dispatch(getAdminClassrooms(0, 1000))
    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }
  }, [dispatch, history, error])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth required margin="normal">
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={type}
          label="Type"
          onChange={(event) => setType(event.target.value)}
        >
          {types.map(type => (
            <MenuItem value={type.value}>{type.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

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
            {classrooms.map(classroom => (
              <MenuItem value={classroom.id}>{classroom.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Skeleton animation="wave" height={100} />
      )}
    </Box>
  );
}