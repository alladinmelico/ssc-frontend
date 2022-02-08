import API from '../../config/api'
import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminUsers, newUser, updateUser, clearErrors } from "../../actions/userActions"
import { NEW_USER_RESET, UPDATE_USER_RESET } from "../../constants/userConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { getAdminCourses } from 'actions/courseActions';

export default function UserModal ({modalClosed, user}) {
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { courses, count} = useSelector((state) => state.courses)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newUser)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.user) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    section: yup.string().required(),
    school_id: yup.string().required(),
    year: yup.number().required(),
    role_id: yup.number().required(),
    course_id: yup.number().required(),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', email: '', section: '', school_id: '', year: 0, role_id: 0, course_id: ''})
  }

  useEffect(() => {
    dispatch(getAdminCourses(page, rowsPerPage))
    if(user.id && !openModal) {
      setOpenModal(true)
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('section', user.section)
      setValue('year', user.year)
      setValue('school_id', user.school_id)
      setValue('role_id', user.role_id)
      setValue('course_id', user.course_id)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_USER_RESET })
      dispatch(getAdminUsers(page, rowsPerPage))
      modalClosed()
      enqueueSnackbar('User successfully added.', {
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
      dispatch({ type: UPDATE_USER_RESET })
      dispatch(getAdminUsers())
      enqueueSnackbar('User successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, user])

  const onSubmit = async data => {
    console.log(data)
    if (user.id) {
      dispatch(updateUser(user.id, data))
    } else {
      dispatch(newUser(data))
    }
  };


  return (
    <div>
      <FormModal
        title={user ? 'Edit User' : 'Add User'}
        onSubmit={handleSubmit(onSubmit)}
        success={success || isUpdated}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
          resetForm()
      }}>
        <TextField 
          {...register("name", { required: true, min: 3 })}
          error={errors.name ? true : false}
          label="Name"
          variant="outlined"
          defaultValue={user ? user.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("email", { required: true, min: 3 })}
          error={errors.email ? true : false}
          label="Email"
          variant="outlined"
          defaultValue={user ? user.email : ''}
          helperText={errors.email?.message}
          margin="normal"
          fullWidth
        />
        
        <TextField 
          {...register("year", { required: true, min: 3 })}
          error={errors.year ? true : false}
          label="Year"
          variant="outlined"
          defaultValue={user ? user.year : ''}
          helperText={errors.year?.message}
          margin="normal"
          fullWidth
          type="number"
        />

        <TextField 
          {...register("section", { required: true, min: 3 })}
          error={errors.section ? true : false}
          label="Section"
          variant="outlined"
          defaultValue={user ? user.section : ''}
          helperText={errors.section?.message}
          margin="normal"
          fullWidth
        />

        <FormControl fullWidth required margin="normal">
        <InputLabel id="course-select-label">Course</InputLabel>
        <Select
          {...register("course_id", { required: true, min: 3 })}
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

        <TextField 
          {...register("school_id", { required: true, min: 3 })}
          error={errors.school_id ? true : false}
          label="School ID"
          variant="outlined"
          defaultValue={user ? user.school_id : ''}
          helperText={errors.school_id?.message}
          margin="normal"
          fullWidth
        />

      </FormModal>
    </div>
  );
}