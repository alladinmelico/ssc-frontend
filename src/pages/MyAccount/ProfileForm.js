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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FileUpload from "react-mui-fileuploader"
import {
  getAdminCourses,
} from "../../actions/courseActions"
import {
  getAdminSections,
} from "../../actions/sectionActions"
import { Box } from '@mui/material';

export default function ProfileForm ({user, onSubmitHandler, setIsEditing }) {
  const { auth, setAuth } = useAuth()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { courses,  count, error } = useSelector((state) => state.courses)
  const { sections } = useSelector((state) => state.sections)
  const [attachment, setAttachment] = useState('');

  const schema = yup.object({
    name: yup.string().required("Name is a required field."),
    email: yup.string().required("Email is a required field."),
    section_id: yup.number().required("Section is a required field."),
    school_id: yup.string().required("School ID is a required field.").matches(/(TUPT-)\d\d-\d\d\d\d/i, "School ID's format should be: TUPT-**-****"),
    year: yup.number().required("Year must be a number type."),
    course_id: yup.number().required("Course ID is a required field."),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', email: '', section_id: '', school_id: '', year: 0, course_id: ''})
  }

  const handleFileUploadError = (error) => {
    // Do something...
  }
  
  const handleFilesChange = (files) => {
    if (files.length > 0) {
      const file = files.pop()

      if (file && file.path) {
        fetch(file.path)
        .then(res => res.blob())
        .then(blob => {
          const fileObj = new File([blob], file.name,{ type: file.contentType })
          setAttachment(fileObj)
        })
      }    
    }
  }

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
    const formData = new FormData()
    Object.entries(data).map(([key, value]) => {
      return formData.append(key, value)
    })

    if (attachment) {
      formData.append('attachment', attachment)
    } else {
      formData.delete('attachment')
    }

    await API.post(`profile-registration`, formData)
      .then(res => {
        if (res.status === 200) {
          setAuth({...auth, hasProfile: true})
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
    if(user.id) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('section_id', user.section_id)
      setValue('year', user.year)
      setValue('school_id', user.school_id);
      setValue('course_id', user.course_id)
    }
  },[count])


  return (
   
    <form  onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{maxWidth:"500px"}}>
        <TextField fullWidth  {...register("name")} error={errors.name ? true : false} label="Name" variant="outlined" />
        <Typography variant="inherit" color="textSecondary">
          {errors.name?.message}
        </Typography>

        <TextField fullWidth sx={{mt:"1rem"}}  {...register("school_id")} error={errors.school_id ? true : false} label="School ID" variant="outlined" />
        <Typography variant="inherit" color="textSecondary">
          {errors.school_id?.message}
        </Typography>

      {count ? (
        <FormControl fullWidth margin="normal">
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
            {...register("course_id")}
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

        <FormControl fullWidth margin="normal">
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
            {...register("year")}
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
        <FormControl fullWidth margin="normal">
            <InputLabel id="course-select-label">Section</InputLabel>
            <Select
            {...register("section_id")}
            error={errors.section_id ? true : false}
            labelId="section-select-label"
            id="section-select"
            label="section"
            defaultValue={user ? user.section_id : ''}
          >
            {sections.map(section => (
              <MenuItem value={section.id}>{section.name}</MenuItem>
            ))}
          </Select>
          </FormControl>
          ) : (
            <Skeleton animation="wave" height={100} />
          )}

        <Box sx={{ mt: '1rem' }}>
          {user.attachment && (
            <Box sx={{ mt: '1rem', p: '0.5rem', display: 'flex', flexDirection: 'column', }}>
              <Typography variant="overline">Current Vaccine Card</Typography>
              <div>
                <img width={500} src={user.attachment} alt="user vaccine card" />
              </div>
            </Box>                
          )}
          <FileUpload
            multiFile={true}
            disabled={false}
            title="Vaccine Card"
            header="[Drag to drop]"
            leftLabel="or"
            rightLabel="to select files"
            buttonLabel="click here"
            maxFileSize={10}
            maxUploadFiles={0}
            maxFilesContainerHeight={357}
            errorSizeMessage={'File is too large.'}
            allowedExtensions={['jpg', 'jpeg', 'png', 'pdf']}
            onFilesChange={handleFilesChange}
            onError={handleFileUploadError}
            imageSrc={'/logo192.png'}
            bannerProps={{ elevation: 0, variant: "outlined", sx: {background: '#005662'} }}
            containerProps={{ elevation: 0, variant: "outlined" }}
          />
        </Box>
     
        <Stack  marginTop="1rem" marginBottom="1rem" direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
          <Button onClick={() =>  { 
            setIsEditing(false)
          }} variant="outlined" color="error">Cancel</Button>

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