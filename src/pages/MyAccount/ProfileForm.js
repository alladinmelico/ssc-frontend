import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import API from '../../config/api'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import {
  getAdminCourses,
} from "../../actions/courseActions"

import {
  getAdminSections,
} from "../../actions/sectionActions"

export default function ProfileForm ({user, onSubmitHandler, setIsEditing }) {
  const { auth, setAuth } = useAuth()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { courses,  count, error } = useSelector((state) => state.courses)
  const { sections } = useSelector((state) => state.sections)
  const { register, handleSubmit, watch, formState: { errors } } = useForm(
    { 
      defaultValues: { 
        name: user.name,
        email: user.email,
        school_id: user.school_id,
        course_id: user.course_id,
        year: user.year,
        section: user.section,
      }
    }
  );

  const years = [
    {
      id: 1,
      name:"First Year",
    },
    {
      id: 2,
      name:"Second Year",
    },
    {
      id: 3,
      name:"Third Year",
    },
    {
      id: 4,
      name:"Fourth Year",
    },
    {
      id: 5,
      name:"Others",
    },
  ]

  const onSubmit = async data => {
    setLoading(true)
    await API.post(`profile-registration`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          setAuth({...auth, hasProfile: true})
          window.location.reload();
        }
      })
      .catch(err => {
      })
      .finally(() => {
        setLoading(false)
        onSubmitHandler()
      })
  };

  useEffect(() =>{
    if (!count){
      dispatch(getAdminCourses(0, 1000))
      dispatch(getAdminSections(0, 1000))
    }
  },[count])


  return (
   
    <form  onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{maxWidth:"500px"}}>
        <TextField fullWidth  {...register("name", { required: true, min: 3 })} error={errors.name ? true : false} label="Name" variant="outlined" />
        <Typography variant="inherit" color="textSecondary">
          {errors.name?.message}
        </Typography>

        <TextField fullWidth sx={{mt:"1rem"}}  {...register("school_id", { required: true})} error={errors.school_id ? true : false} label="School ID" variant="outlined" />
        <Typography variant="inherit" color="textSecondary">
          {errors.school_id?.message}
        </Typography>

      {count ? (
        <FormControl fullWidth required margin="normal">
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
            {...register("course_id", { required: true})}
            error={errors.course_id ? true : false}
            labelId="course-select-label"
            id="course-select"
            label="course"
            defaultValue={user ? user.course_id : ''}
          >
            {courses.map(course => (
              <MenuItem value={course.id}>{course.name}</MenuItem>
            ))}
          </Select>
          </FormControl>
          ) : (
            <Skeleton animation="wave" height={100} />
          )}

        <FormControl fullWidth required margin="normal">
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
            {...register("year", { required: true})}
            error={errors.year ? true : false}
            labelId="year-select-label"
            id="year-select"
            label="year"
            defaultValue={user ? user.year : ''}
          >
            {years.map(year => (
              <MenuItem value={year.id}>{year.name}</MenuItem>
            ))}
          </Select>
          </FormControl>

        {count ? (
        <FormControl fullWidth required margin="normal">
            <InputLabel id="course-select-label">Section</InputLabel>
            <Select
            {...register("section_id", { required: true})}
            error={errors.section_id ? true : false}
            labelId="section-select-label"
            id="section-select"
            label="section"
            defaultValue={user ? user.section_id : ''}
          >
            {sections.map(section => (
              <MenuItem value={section.id} key={section.id}>{section.name}</MenuItem>
            ))}
          </Select>
          </FormControl>
          ) : (
            <Skeleton animation="wave" height={100} />
          )}
     
        <Stack  marginTop="1rem" direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
          <Button onClick={() =>  { 
            setIsEditing(false)
          }} variant="outlined" color="secondary">Cancel</Button>

          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            type="submit"
           
          >
            Save
          </LoadingButton>
        </Stack>
      </Container>
    </form>
  );
}