import API from '../../config/api'
import React, { useState, useEffect } from 'react'
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
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Page from 'material-ui-shell/lib/containers/Page';
import { Link, useParams } from "react-router-dom";
import {
  getFacilityDetails
} from "../../actions/facilityActions"
import { Container } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function FacilityForm () {
  const [area, setArea] = useState(0)
  const [maxPeople, setMaxPeople] = useState(0)
  const [buildings, setBuildings] = useState([])
  const [types, setfacilityTypes] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [selected, setSelected] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(1)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newFacility)
  const { loading: loadingDetails, facility, error: errorDetails } = useSelector((state) => state.facilityDetails)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.facility) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate();
  const { id } = useParams();

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
    capacity: yup.number("Capacity must be a number.").required("Capacity is a required field.").max(area ? maxPeople : 1000),
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
    if(facility.id) {      
      setValue('name', facility.name)
      setValue('code', facility.code)
      setValue('capacity', facility.capacity)
      setValue('type', types.find(item => item.value === facility.type)?.id)
      setValue('building_id', facility.building_id)
      setSelected(facility.svg_key)
    } else if (id && !loadingDetails) {
      dispatch(getFacilityDetails(id))
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_FACILITY_RESET })
      dispatch(getAdminFacilities(0, 50))
      enqueueSnackbar('Facility successfully added.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
      navigate(-1)
    }

    if (isUpdated) {
      resetForm()    
      dispatch({ type: UPDATE_FACILITY_RESET })
      dispatch(getAdminFacilities(0, 50))
      enqueueSnackbar('Facility successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
      navigate(-1)
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
    } else {
      enqueueSnackbar('Please select a room on the Map.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  };

  const changeArea = (event) => {
    const USER_AREA = 2.54
    setArea(event.target.value)
    setMaxPeople(Math.trunc(event.target.value/USER_AREA))
  }

  return (
    <Page pageTitle="Facility Form">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("name")}
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
                    {...register("code")}
                    error={errors.code ? true : false}
                    label="Code"
                    variant="outlined"
                    defaultValue={facility ? facility.code : ''}
                    helperText={errors.code?.message}
                    
                    fullWidth
                  />

                  <FormControl fullWidth>
                    <InputLabel id="types-select-label">Type</InputLabel>
                    <Select
                      {...register("type")}
                      error={errors.type ? true : false}
                      labelId="types-select-label"
                      id="types-select"
                      label="types"
                      defaultValue={facility ? types.find(item => item.value === facility.type)?.id : ''}
                    
                    >
                      {types.map(type => (
                        <MenuItem value={type.id} key={type.id}>{type.value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>


                <FormControl fullWidth margin="normal">
                  <InputLabel id="building-select-label">Building</InputLabel>
                  <Select
                    {...register("building_id")}
                    error={errors.building_id ? true : false}
                    labelId="building-select-label"
                    id="building-select"
                    label="building"
                    defaultValue={facility ? facility.building_id : ''}                  
                  >
                    {buildings.map(building => (
                      <MenuItem value={building.id} key={building.id}>{building.value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField 
                  {...register("capacity")}
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

                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <TextField
                    value={area}
                    onChange={changeArea}
                    label="Area of the room (sqm)"
                    variant="outlined"
                    helperText="Use this to get a rough estimate of the maximum people to fit in a room while maintaining the 6 feet social distancing."
                    type="number"
                    fullWidth
                  />
                  <TextField 
                    value={maxPeople}
                    label="Maximum people"
                    variant="outlined"
                    disabled
                    type="number"
                    fullWidth
                  />
                </Box>
              </Box>
            )}
          </Box> 
          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ py: '1rem' }}>
            <Link to="/facility" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="secondary">Cancel</Button>
            </Link>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
            >
              Save
            </LoadingButton>
          </Stack> 
        </form>
      </Container>
    </Page>
  );
}