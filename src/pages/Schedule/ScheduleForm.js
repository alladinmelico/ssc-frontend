import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminSchedules, newSchedule, updateSchedule, clearErrors } from "../../actions/scheduleActions"
import { NEW_SCHEDULE_RESET, UPDATE_SCHEDULE_RESET } from "../../constants/scheduleConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

export default function ScheduleForm ({modalClosed, schedule}) {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newSchedule)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.schedule) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required(),
    code: yup.string().required(),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', code: ''})
  }

  useEffect(() => {
    console.log(schedule)
    if(schedule.id && !openModal) {
      setOpenModal(true)
      setValue('name', schedule.name)
      setValue('code', schedule.code)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_SCHEDULE_RESET })
      dispatch(getAdminSchedules())
      modalClosed()
      enqueueSnackbar('Schedule successfully added.', {
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
      dispatch({ type: UPDATE_SCHEDULE_RESET })
      dispatch(getAdminSchedules())
      enqueueSnackbar('Schedule successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, schedule])

  const onSubmit = async data => {
    console.log(data)
    if (schedule.id) {
      dispatch(updateSchedule(schedule.id, data))
    } else {
      dispatch(newSchedule(data))
    }
  };


  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField 
          {...register("name", { required: true, min: 3 })}
          error={errors.name ? true : false}
          label="Name"
          variant="outlined"
          defaultValue={schedule ? schedule.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("code", { required: true, min: 3 })}
          error={errors.code ? true : false}
          label="Code"
          variant="outlined"
          defaultValue={schedule ? schedule.code : ''}
          helperText={errors.code?.message}
          margin="normal"
          fullWidth
        />
      </form>
    </div>
  );
}