import React, { useEffect, useState } from 'react'
import Civil from './Civil'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import API from '../../config/api'
import {
  getAdminFacilities,
} from "../../actions/facilityActions"
import { useDispatch, useSelector } from "react-redux"

const Main = () => {
  const dispatch = useDispatch()
  const [buildings, setBuildings] = useState([])
  const [selected, setSelected] = useState('')
  const { loading, facilities, count, error } = useSelector((state) => state.facilities)
  
  function facilitySelected (facility) {
    console.log(facility)
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

  useEffect(() => {
    getBuildings()
    dispatch(getAdminFacilities(0, 100, 'has_schedule=true'))
  }, [dispatch, count, error])

  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', }}>
      <FormControl fullWidth required margin="normal">
        <InputLabel id="types-select-label">Buildings</InputLabel>
        <Select
          label="Buildings"                
        >
          {buildings.map(types => (
            <MenuItem value={types.id}>{types.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Civil setSelected={setSelected} selected={selected} />
    </Paper>
  )
}

export default Main