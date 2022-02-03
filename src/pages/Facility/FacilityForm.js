import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminFacilities, newFacility, updateFacility, clearErrors } from "../../actions/facilityActions"
import { NEW_FACILITY_RESET, UPDATE_FACILITY_RESET } from "../../constants/facilityConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

export default function FacilityModal ({modalClosed, facility}) {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newFacility)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.facility) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required(),
    code: yup.string().required(),
    capacity: yup.number().required(),
    type: yup.number().required(),
    building_id: yup.number().required(),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', code: '', capacity: 0, type: '', building_id: ''})
  }

  useEffect(() => {
    console.log(facility)
    if(facility.id && !openModal) {
      setOpenModal(true)
      setValue('name', facility.name)
      setValue('code', facility.code)
      setValue('capacity', facility.capacity)
      setValue('type', facility.type)
      setValue('building_id', facility.building_id)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_FACILITY_RESET })
      dispatch(getAdminFacilities())
      modalClosed()
      enqueueSnackbar('Facility successfully added.', {
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
      dispatch({ type: UPDATE_FACILITY_RESET })
      dispatch(getAdminFacilities())
      enqueueSnackbar('Facility successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, facility])

  const onSubmit = async data => {
    console.log(data)
    if (facility.id) {
      dispatch(updateFacility(facility.id, data))
    } else {
      dispatch(newFacility(data))
    }
  };


  return (
    <div>
      <FormModal
        title={facility ? 'Edit Facility' : 'Add Facility'}
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
          defaultValue={facility ? facility.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("code", { required: true, min: 3 })}
          error={errors.code ? true : false}
          label="Code"
          variant="outlined"
          defaultValue={facility ? facility.code : ''}
          helperText={errors.code?.message}
          margin="normal"
          fullWidth
        />
        <TextField 
          {...register("capacity", { required: true, min: 3 })}
          error={errors.capacity ? true : false}
          label="Capacity"
          variant="outlined"
          defaultValue={facility ? facility.capacity : ''}
          helperText={errors.capacity?.message}
          margin="normal"
          fullWidth
          type="number"
        />

        <TextField 
          {...register("type", { required: true, min: 3 })}
          error={errors.type ? true : false}
          label="Type"
          variant="outlined"
          defaultValue={facility ? facility.type : ''}
          helperText={errors.type?.message}
          margin="normal"
          fullWidth
          type="number"
        />

        <TextField 
          {...register("building_id", { required: true, min: 3 })}
          error={errors.building_id ? true : false}
          label="Building"
          variant="outlined"
          defaultValue={facility ? facility.building_id : ''}
          helperText={errors.building_id?.message}
          margin="normal"
          fullWidth
          type="number"
        />
      </FormModal>
    </div>
  );
}