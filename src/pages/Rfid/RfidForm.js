import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import { Skeleton } from '@mui/material';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminRfids, newRfid, updateRfid, clearErrors, } from "../../actions/rfidActions"
import { NEW_RFID_RESET, UPDATE_RFID_RESET } from "../../constants/rfidConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import * as yup from "yup"
import { getAdminUsers } from 'actions/userActions'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Button from '@mui/material/Button';

export default function RfidForm ({modalClosed, rfid}) {
  const [openModal, setOpenModal] = useState(false)
  const { users, count  } = useSelector((state) => state.users)
  const [toAddUser, setToAddUser] = useState(rfid? rfid.user : {});
  const { loading, error, success, } = useSelector((state) => state.newRfid)
  const dispatch = useDispatch()

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.rfid) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    value: yup.string().required("Value is a required field."),
    is_logged: yup.boolean().required("Name is a required field."),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ value: '', is_logged: '', user_id: ''})
  }

  useEffect(() => {
    if (users && users.length === 0) {
      dispatch(getAdminUsers(0, 50))
    }
    if(rfid && rfid.id  && !openModal) {
      setOpenModal(true)
      setValue('value', rfid.value)
      setValue('is_logged', rfid.is_logged)
      setValue('user_id', rfid.user_id)
      setValue('email', rfid.user?.email)
      setToAddUser(rfid.user)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_RFID_RESET })
      dispatch(getAdminRfids(0, 50))
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
      dispatch(getAdminRfids(0, 50))
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
    if (rfid.id) {
      dispatch(updateRfid(rfid.id, {...data, user_id: toAddUser.id}))
    } else {
      dispatch(newRfid({...data, user_id: toAddUser.id}))
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
        title={rfid && rfid.id ? 'Edit Rfid' : 'Add Rfid'}
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
          {...register("value", { required: true, min: 3 })}
          error={errors.name ? true : false}
          label="Value"
          variant="outlined"
          defaultValue={rfid ? rfid.value : ''}
          helperText={errors.value?.message}
          margin="normal"
          fullWidth
        />

        {count ? (
        <FormControl fullWidth required margin="normal">
          <Autocomplete
            id="emails-list"
            name="users"
            options={users}
            value={toAddUser}
            getOptionLabel={((option) => option.email)}
            onChange={(event, newVal) => setToAddUser(newVal)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="User Email"
                placeholder="User Email"
              />
            )}
          />
        </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}

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