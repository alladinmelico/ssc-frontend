import API from '../../config/api'
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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


export default function FacilityModal ({page, rowsPerPage, modalClosed, facility}) {
  const [openModal, setOpenModal] = useState(false)
  const [buildings, setBuildings] = useState([])
  const [types, setfacilityTypes] = useState([])
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

  const getBuildings = async () => {
    try {

      const { data }  = await API.get('/buildings')
      await console.log(data)
      await setBuildings(data)


    } catch (error) {
        console.log(error)
     }
  }
  
  const getfacilityTypes = async () => {
    try {

      const { data }  = await API.get('/facility-types')
      await console.log(data)
      await setfacilityTypes(data)


    } catch (error) {
        console.log(error)
     }
  }

  useEffect(( ) => {
    getBuildings()
    getfacilityTypes()
    console.log('facility', facility);
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
      dispatch(getAdminFacilities(page, rowsPerPage))
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

      <FormControl fullWidth required margin="normal">
        <InputLabel id="types-select-label">Facility</InputLabel>
        <Select
          {...register("type", { required: true, min: 3 })}
          error={errors.type ? true : false}
          labelId="types-select-label"
          id="types-select"
          label="types"
          defaultValue={facility ? facility.type : ''}
         
        >
          {types.map(types => (
            <MenuItem value={types.id}>{types.value}</MenuItem>
          ))}
        </Select>
      </FormControl>

         <FormControl fullWidth required margin="normal">
        <InputLabel id="building-select-label">Building</InputLabel>
        <Select
          {...register("building_id", { required: true, min: 3 })}
          error={errors.building_id ? true : false}
          labelId="building-select-label"
          id="building-select"
          label="building"
          defaultValue={facility ? facility.building_id : ''}
         
        >
          {buildings.map(building => (
            <MenuItem value={building.id}>{building.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </FormModal>
    </div>
  );
}