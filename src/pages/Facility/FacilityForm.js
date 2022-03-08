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
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Main from 'components/Map/Main';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function FacilityModal ({page, rowsPerPage, modalClosed, facility}) {
  const [openModal, setOpenModal] = useState(false)
  const [area, setArea] = useState(0)
  const [maxPeople, setMaxPeople] = useState(0)
  const [buildings, setBuildings] = useState([])
  const [types, setfacilityTypes] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [selected, setSelected] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(1)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newFacility)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.facility) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const departments = ['Bachelor of Engineering and Allied Department',
    'Basic Arts and Sciences Department',
    'Civil and Allied Department',
    'Electrical and Allied Department',
    'Mechanical and Allied Department',
  ]

  const schema = yup.object({
    name: yup.string().required("Name is a required field."),
    code: yup.string().required("Code is a required field."),
    code: yup.string().required("Code is a required field."),
    capacity: yup.number().required("Capacity is a required field."),
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
      await setBuildings(data)


    } catch (error) {
     }
  }
  
  const getfacilityTypes = async () => {
    try {

      const { data }  = await API.get('/facility-types')
      await setfacilityTypes(data)

    } catch (error) {
     }
  }

  useEffect(( ) => {
    getBuildings()
    getfacilityTypes()
    if(facility.id && !openModal) {
      setOpenModal(true)
      setValue('name', facility.name)
      setValue('code', facility.code)
      setValue('capacity', facility.capacity)
      setValue('type', types.find(item => item.value === facility.type)?.id)
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
    if (selected) {
      data.department_id = selectedDepartment
      data.svg_key = selected
      if (facility.id) {
        dispatch(updateFacility(facility.id, data))
      } else {
        dispatch(newFacility(data))
      }
    }
  };

  const changeArea = (event) => {
    const USER_AREA = 2.54
    setArea(event.target.value)
    setMaxPeople(Math.trunc(event.target.value/USER_AREA))
  }

  return (
    <div>
      <FormModal
        title={facility.id ? 'Edit Facility' : 'Add Facility'}
        onSubmit={handleSubmit(onSubmit)}
        success={success || isUpdated}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
          resetForm()
      }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={(event, newVal) => setSelectedTab(newVal)} aria-label="basic tabs example">
              <Tab label="Map" value={0} />
              <Tab label="Form" value={1} />
            </Tabs>
          </Box>
          {selectedTab === 0 ? (
            <Main selected={selected} setSelected={setSelected} selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment}/>
          ):(
            <Box>
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

              <Stack direction="row" spacing={2}>
                <TextField 
                  {...register("code", { required: true, min: 3 })}
                  error={errors.code ? true : false}
                  label="Code"
                  variant="outlined"
                  defaultValue={facility ? facility.code : ''}
                  helperText={errors.code?.message}
                  
                  fullWidth
                />

                <FormControl fullWidth required>
                  <InputLabel id="types-select-label">Type</InputLabel>
                  <Select
                    {...register("type", { required: true, min: 3 })}
                    error={errors.type ? true : false}
                    labelId="types-select-label"
                    id="types-select"
                    label="types"
                    defaultValue={facility ? types.find(item => item.value === facility.type)?.id : ''}
                  
                  >
                    {types.map(types => (
                      <MenuItem value={types.id}>{types.value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>


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

              <Divider variant="middle" sx={{ my: '1rem' }} />

              <Box sx={{ display: 'flex', gap: '1rem', px: '1rem' }}>
                <TextField
                  value={area}
                  onChange={changeArea}
                  label="Area of the room (sqm)"
                  variant="outlined"
                  helperText="Use this to get a rough estimate of the maximum people to fit in a room while maintaining the 6 feet social distancing."
                  type="number"
                />
                <TextField 
                  value={maxPeople}
                  label="Maximum people"
                  variant="outlined"
                  disabled
                  type="number"
                />
              </Box>
            </Box>
          )}
        </Box>  
      </FormModal>
    </div>
  );
}