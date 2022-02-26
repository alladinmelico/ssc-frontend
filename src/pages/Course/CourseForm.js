import API from '../../config/api'
import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminCourses, newCourse, updateCourse, clearErrors } from "../../actions/courseActions"
import { NEW_COURSE_RESET, UPDATE_COURSE_RESET } from "../../constants/courseConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function CourseModal ({page, rowsPerPage, modalClosed, course}) {
  const [openModal, setOpenModal] = useState(false)
  const [departments, setcourseDepartments] = useState([])
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newCourse)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.course) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required("Name is a required field."),
    code: yup.string().required("Code is a required field."),
    department_id: yup.number().required()
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', code: '', department_id: ''})
  }

  const getcourseDepartments = async () => {
    try {

      const { data }  = await API.get('/departments')
      await console.log(data)
      await setcourseDepartments(data)


    } catch (error) {
        console.log(error)
     }
  }

  useEffect(() => {
    getcourseDepartments()
    if(course.id && !openModal) {
      setOpenModal(true)
      setValue('name', course.name)
      setValue('code', course.code)
      setValue('department_id', course.department_id)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_COURSE_RESET })
      dispatch(getAdminCourses(page, rowsPerPage))
      modalClosed()
      enqueueSnackbar('Course successfully added.', {
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
      dispatch({ type: UPDATE_COURSE_RESET })
      dispatch(getAdminCourses())
      enqueueSnackbar('Course successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, course])

  const onSubmit = async data => {
    console.log(data)
    if (course.id) {
      dispatch(updateCourse(course.id, data))
    } else {
      dispatch(newCourse(data))
    }
  };


  return (
    <div>
      <FormModal
        title={course ? 'Add Course' : 'Edit Course'}
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
          defaultValue={course ? course.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("code", { required: true, min: 3 })}
          error={errors.code ? true : false}
          label="Code"
          variant="outlined"
          defaultValue={course ? course.code : ''}
          helperText={errors.code?.message}
          margin="normal"
          fullWidth
        />

      <FormControl fullWidth required margin="normal">
        <InputLabel id="departments-select-label">Department</InputLabel>
        <Select
          {...register("department_id", { required: true, min: 3 })}
          error={errors.department_id ? true : false}
          labelId="departments-select-label"
          id="departments-select"
          label="departments"
          defaultValue={course ? course.department_id : ''}
         
        >
          {departments.map(departments => (
            <MenuItem value={departments.id}>{departments.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </FormModal>
    </div>
  );
}