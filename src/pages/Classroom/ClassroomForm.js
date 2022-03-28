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
import { Autocomplete, Button, Chip, OutlinedInput, Skeleton } from '@mui/material';
import { getAdminSections } from 'actions/sectionActions';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export default function ClassroomModal ({modalClosed, classroom}) {
  const [openModal, setOpenModal] = useState(false)
  const [courses, setCourses] = useState([])
  const { loading: subjectLoading, subjects } = useSelector((state) => state.subjects)
  const { loading: userLoading, users } = useSelector((state) => state.users)
  const { loading: sectionLoading, sections, count } = useSelector((state) => state.sections)
  const [toAddUsers, setToAddUsers] = useState([]);
  const [toAddSections, setToAddSections] = useState(classroom ? classroom.section : ''); 
  const [toAddSubjects, setToAddSubjects] = useState(classroom ? classroom.subject : ''); 
  const [toAddGclassrooms, setToAddGclassrooms] = useState(classroom ? classroom.google_classroom_id : ''); 
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
  });

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', description_heading: '', description: '', section_id: '', subject_id: '', google_classroom_id: '', users:[]})
  }

  const clearForm = () => {
    reset({ name: '', description_heading: '', description: '', users:[]})
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

  function fetchGClassroomData (data) {
    setValue('name', data.name)
    setValue('description_heading', data.descriptionHeading)
    setValue('description', data.section)
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
      if (courses.find(item => item.id === classroom.google_classroom_id)) {
        setToAddGclassrooms(courses.name)
      }
      setToAddUsers(classroom.users)
      setToAddSections(sections.find(item => item.id === classroom.section_id))
      setToAddSubjects(subjects.find(item => item.id === classroom.subject_id))
    }

    if (courses.length === 0) {
      getClasses()
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
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
      resetForm()
    }

    if (isUpdated) {
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
      resetForm()     
    }
  }, [dispatch, error, updateError, isUpdated, success, classroom])

  const onSubmit = async data => {
    data.section_id = toAddSections.id

    data.subject_id = toAddSubjects.id
    if (toAddGclassrooms) {
      data.google_classroom_id = toAddGclassrooms.id
    }

    if (toAddUsers.length) {
      data.users = toAddUsers.map(item => item.id)
    }
    data.users.push(auth.id) // add currently authenticated user to the class being created
    if (classroom.id) {
      dispatch(updateClassroom(classroom.id, data))
    } else {
      dispatch(newClassroom(data))
    }
  };


  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpenModal(true)}
        size="large"
        aria-label="add"
        style={{ backgroundColor: 'transparent' }}
        startIcon={<AddBoxOutlinedIcon />}
      >
        Add
      </Button>
      <FormModal
        title={classroom && classroom.id ? 'Edit Classroom' : 'Add Classroom'}
        onSubmit={handleSubmit(onSubmit)}
        success={success || isUpdated}
        loading={loading || updateLoading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
          clearForm()
      }}>
          {courses && courses.length ? (
            <FormControl fullWidth margin="normal">
              <Autocomplete
                id="gclassroom-list"
                name="google_classroom_id"
                options={courses}
                value={toAddGclassrooms}
                getOptionLabel={((option) => option.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Google Classrooms"
                    placeholder="Google Classrooms"
                  />
                )}
                onChange={(event, newVal) => {
                  setToAddGclassrooms(newVal)
                  fetchGClassroomData(newVal)
                }}
              />
            </FormControl>
            ) : (
            <Skeleton animation="wave" height={100} />
          )}
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
          <Autocomplete
            required
            id="sections-list"
            name="sections"
            options={sections}
            value={toAddSections}
            getOptionLabel={((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sections"
                placeholder="Sections"
              />
            )}
          onChange={(event, newVal) => setToAddSections(newVal)}
          helperText={errors.section_id?.message}
          />
        </FormControl>
          ) : (
            <Skeleton animation="wave" height={100} />
          )}

      {count ? (
        <FormControl fullWidth margin="normal">
          <Autocomplete
          required
            id="subjects-list"
            name="subjects"
            options={subjects}
            value={toAddSubjects}
            getOptionLabel={((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Subjects"
                placeholder="Subjects"
              />
            )}
          onChange={(event, newVal) => setToAddSubjects(newVal)}
          helperText={errors.subject_id?.message}
          />
        </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}

        {count ? (
          <FormControl fullWidth margin="normal">
          <Autocomplete
            required
            id="gclassroom-list"
            name="google_classroom_id"
            options={courses}
            value={toAddGclassrooms}
            getOptionLabel={((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Google Classrooms"
                placeholder="Google Classrooms"
              />
            )}
          onChange={(event, newVal) => setToAddGclassrooms(newVal)}
          helperText={errors.google_classroom_id?.message}
          />
          </FormControl>
          ) : (
          <Skeleton animation="wave" height={100} />
        )}
        
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
                placeholder="Users"
              />
            )}
            onChange={(event, newVal) => setToAddUsers(newVal)}
            helperText={errors.users?.message}
          />
        </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}

      </FormModal>
    </div>
  );
}