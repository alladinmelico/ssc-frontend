import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminClassrooms, newClassroom, updateClassroom, clearErrors } from "../../actions/classroomActions"
import { NEW_CLASSROOM_RESET, UPDATE_CLASSROOM_RESET } from "../../constants/classroomConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

export default function ClassroomModal ({page, rowsPerPage, modalClosed, classroom}) {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newClassroom)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.classroom) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required(),
    description_heading: yup.string().required(),
    description: yup.string().required(),
    section: yup.string().required(),
    subject_id: yup.number().required(),
    google_classroom_id: yup.string(),
    users: yup.array().required()
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', description_heading: '', description: '', section: '', subject_id: '0', google_classroom_id: '', users: ['0']})
  }

  useEffect(() => {
    console.log(classroom)
    if(classroom.id && !openModal) {
      setOpenModal(true)
      setValue('name', classroom.name)
      setValue('description_heading', classroom.description_heading)
      setValue('description', classroom.description)
      setValue('section', classroom.section)
      setValue('subject_id', classroom.subject_id)
      setValue('google_classroom_id', classroom.google_classroom_id)
      setValue('users', classroom.users)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_CLASSROOM_RESET })
      dispatch(getAdminClassrooms(page, rowsPerPage))
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
      dispatch(getAdminClassrooms(page, rowsPerPage))
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
    console.log(data)
    if (classroom.id) {
      dispatch(updateClassroom(classroom.id, data))
    } else {
      dispatch(newClassroom(data))
    }
  };


  return (
    <div>
      <FormModal
        title={classroom ? 'Add Classroom' : 'Edit Classroom'}
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
          defaultValue={classroom ? classroom.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("description_heading", { required: true, min: 3 })}
          error={errors.description_heading ? true : false}
          label="Desc Heading"
          variant="outlined"
          defaultValue={classroom ? classroom.description_heading : ''}
          helperText={errors.description_heading?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("description", { required: true, min: 3 })}
          error={errors.description ? true : false}
          label="Description"
          variant="outlined"
          defaultValue={classroom ? classroom.description : ''}
          helperText={errors.description?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("section", { required: true, min: 3 })}
          error={errors.section ? true : false}
          label="Section"
          variant="outlined"
          defaultValue={classroom ? classroom.section : ''}
          helperText={errors.section?.message}
          margin="normal"
          fullWidth
        />
        
        <TextField 
          {...register("subject_id", { required: true, min: 3 })}
          error={errors.subject_id ? true : false}
          label="Subject ID"
          variant="outlined"
          defaultValue={classroom ? classroom.subject_id : ''}
          helperText={errors.subject_id?.message}
          margin="normal"
          fullWidth
          type="number"
        />

        <TextField 
          {...register("google_classroom_id", { required: true, min: 3 })}
          error={errors.google_classroom_id ? true : false}
          label="Google Classroom ID"
          variant="outlined"
          defaultValue={classroom ? classroom.google_classroom_id : ''}
          helperText={errors.google_classroom_id?.message}
          margin="normal"
          fullWidth
        />
        
        <TextField 
          {...register("users", { required: true, min: 3 })}
          error={errors.users ? true : false}
          label="Users ID"
          variant="outlined"
          defaultValue={classroom ? classroom.users : ''}
          helperText={errors.users?.message}
          margin="normal"
          fullWidth
        />
        

      </FormModal>
    </div>
  );
}