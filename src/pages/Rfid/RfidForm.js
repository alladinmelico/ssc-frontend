import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminRfids, newRfid, updateRfid, clearErrors } from "../../actions/rfidActions"
import { NEW_RFID_RESET, UPDATE_RFID_RESET } from "../../constants/rfidConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import * as yup from "yup"

export default function RfidModal ({modalClosed, rfid, page, rowsPerPage}) {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newRfid)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.rfid) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    value: yup.string().required(),
    is_logged: yup.boolean().required(),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ value: '', is_logged: '', user_id: ''})
  }

  useEffect(() => {
    console.log(rfid)
    if(rfid.id && !openModal) {
      setOpenModal(true)
      setValue('value', rfid.value)
      setValue('is_logged', rfid.is_logged)
      setValue('user_id', rfid.user.id)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_RFID_RESET })
      dispatch(getAdminRfids(page, rowsPerPage))
      modalClosed()
      enqueueSnackbar('Rfid successfully added.', {
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
      dispatch({ type: UPDATE_RFID_RESET })
      dispatch(getAdminRfids(page, rowsPerPage))
      enqueueSnackbar('Rfid successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, rfid])

  const onSubmit = async data => {
    console.log(data)
    if (rfid.id) {
      dispatch(updateRfid(rfid.id, data))
    } else {
      dispatch(newRfid(data))
    }
  };


  return (
    <div>
      <FormModal
        title={rfid ? 'Edit Rfid' : 'Add Rfid'}
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
          {...register("value", { required: true, min: 3 })}
          error={errors.name ? true : false}
          label="Value"
          variant="outlined"
          defaultValue={rfid ? rfid.value : ''}
          helperText={errors.value?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("user_id", { required: true, min: 3 })}
          error={errors.code ? true : false}
          label="Name"
          variant="outlined"
          defaultValue={rfid ? rfid.user_id : ''}
          helperText={errors.user_id?.message}
          margin="normal"
          fullWidth
        />

        <FormControlLabel control={<Switch 
        {...register("is_logged", { required: true})}
        error={errors.is_logged ? true : false}
        defaultChecked={rfid && rfid.is_logged === 1}
        fullWidth
         />} label="Inside the Campus" />
      </FormModal>
    </div>
  );
}