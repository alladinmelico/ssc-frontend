import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminClassrooms, newClassroom, updateClassroom, clearErrors } from "../../actions/classroomActions"
import { getAdminSubjects } from "../../actions/subjectActions"
import { getAdminUsers } from "../../actions/userActions"
import { NEW_CLASSROOM_RESET, UPDATE_CLASSROOM_RESET } from "../../constants/classroomConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete, Box, Chip, OutlinedInput, Skeleton } from '@mui/material';
import { getAdminSections } from 'actions/sectionActions';

export default function ClassroomModal ({modalClosed, classroom}) {
  const [openModal, setOpenModal] = useState(false)
  const [courses, setCourses] = useState([])
  const { loading: subjectLoading, subjects } = useSelector((state) => state.subjects)
  const { loading: userLoading, users } = useSelector((state) => state.users)
  const { loading: sectionLoading, sections, count } = useSelector((state) => state.sections)
  const [toAddUsers, setToAddUsers] = useState([]);
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newClassroom)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.classroom) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState({
    users: [],
  })

  const schema = yup.object({
    name: yup.string().required("Name is a required field."),
    description_heading: yup.string().required("Description Heading is a required field."),
    description: yup.string().required("Description is a required field."),
    section_id: yup.number().required("Section is a required field."),
    subject_id: yup.number().required("Subject is a required field."),
    google_classroom_id: yup.string("Google Classroom ID is a string.")
  });

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', description_heading: '', description: '', section_id: '', subject_id: '', google_classroom_id: ''})
  }

  function getClasses() {
    const request = new XMLHttpRequest();
    const url = 'https://classroom.googleapis.com/v1/courses?access_token=' + auth.googleToken;
    request.open('GET', url, true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          setCourses(data.courses)
        }
      }
    }
  }

  useEffect(() => {
    if (!subjectLoading) {
      dispatch(getAdminSubjects(0, 1000))
    }
    if (!sectionLoading) {
      dispatch(getAdminSections(0, 1000))
    }
    if (!userLoading) {
      dispatch(getAdminUsers(0, 1000))
    }

    if(classroom.id && !openModal) {
      setOpenModal(true)
      setValue('name', classroom.name)
      setValue('description_heading', classroom.description_heading)
      setValue('description', classroom.description)
      setValue('section_id', classroom.section?.id)
      setValue('subject_id', classroom.subject_id)
      if (classroom.google_classroom_id) {
        setValue('google_classroom_id', classroom.google_classroom_id)
      }
      setToAddUsers(classroom.users)
    }

    if (courses.length === 0) {
      getClasses()
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_CLASSROOM_RESET })
      dispatch(getAdminClassrooms(0, 50))
      modalClosed()
      enqueueSnackbar('Classroom successfully added.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }

    if (isUpdated) {
      resetForm()     
      modalClosed() 
      dispatch({ type: UPDATE_CLASSROOM_RESET })
      dispatch(getAdminClassrooms(0, 50))
      enqueueSnackbar('Classroom successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, classroom])

  const onSubmit = async data => {
    if (toAddUsers.length) {
      data.users = toAddUsers.map(item => item.id)
    }
    if (classroom.id) {
      dispatch(updateClassroom(classroom.id, data))
    } else {
      dispatch(newClassroom(data))
    }
  };


  return (
    <div>
      <FormModal
        title={classroom && classroom.id ? 'Edit Classroom' : 'Add Classroom'}
        onSubmit={handleSubmit(onSubmit)}
        success={success || isUpdated}
        loading={loading || updateLoading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
          resetForm()
      }}>
        <TextField 
          {...register("name")}
          error={errors.name ? true : false}
          label="Name"
          variant="outlined"
          defaultValue={classroom ? classroom.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("description_heading")}
          error={errors.description_heading ? true : false}
          label="Description Heading"
          variant="outlined"
          defaultValue={classroom ? classroom.description_heading : ''}
          helperText={errors.description_heading?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("description")}
          error={errors.description ? true : false}
          label="Description"
          variant="outlined"
          defaultValue={classroom ? classroom.description : ''}
          helperText={errors.description?.message}
          margin="normal"
          fullWidth
        />

        {count ? (
        <FormControl fullWidth margin="normal">
            <InputLabel id="section-select-label">Section</InputLabel>
            <Select
            {...register("section_id")}
            error={errors.section_id ? true : false}
            labelId="section-select-label"
            id="section-select"
            label="section"
            defaultValue={classroom ? classroom.section_id : ''}
          >
            {sections.map(section => (
              <MenuItem value={section.id}>{section.name}</MenuItem>
            ))}
          </Select>
          </FormControl>
          ) : (
            <Skeleton animation="wave" height={100} />
          )}

      {count ? (
        <FormControl fullWidth margin="normal">
          <InputLabel id="subject-select-label">Subject</InputLabel>
          <Select
            {...register("subject_id")}
            error={errors.subject_id ? true : false}
            labelId="subject-select-label"
            id="subject-select"
            label="subject"
            defaultValue={classroom ? classroom.subject_id : ''}
          
          >
            {subjects.map(subject => (
              <MenuItem value={subject.id}>{subject.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}

        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel id="section-select-label">Google Classroom</InputLabel>
              <Select
              {...register("google_classroom_id")}
              error={errors.google_classroom_id ? true : false}
              label="Google Classroom"
              variant="outlined"
              id="gclassroom-select"
              defaultValue={classroom ? classroom.google_classroom_id : ''}
            >
              {courses.map(course => (
                <MenuItem value={course.id}>{course.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        {count ? (
        <FormControl fullWidth margin="normal">
          <Autocomplete
            multiple={true}
            id="users-list"
            name="users"
            options={users}
            value={toAddUsers}
            getOptionLabel={((option) => option.email)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Users"
                placeholder="User"
              />
            )}
            onChange={(event, newVal) => setToAddUsers(newVal)}
          />
        </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}

      </FormModal>
    </div>
  );
}