import React, { useEffect, useState } from 'react'
import Civil from './Civil'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import {
  getAdminFacilities,
} from "../../actions/facilityActions"
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Main = ({selected, setSelected, selectedDepartment, setSelectedDepartment, showDetails}) => {
  const dispatch = useDispatch()

  const { facilities } = useSelector((state) => state.facilities)
  
  const departments = ['Bachelor of Engineering and Allied Department',
    'Basic Arts and Sciences Department',
    'Civil and Allied Department',
    'Electrical and Allied Department',
    'Mechanical and Allied Department',
  ]

  function formatFacility () {
    const temp = {}
    
    facilities.filter(facility => facility.svg_key !== null && facility.department_id === selectedDepartment)
    .forEach(facility => {
      temp[facility.svg_key] = {...facility}
    })

    return temp
  }

  useEffect(() => {
    dispatch(getAdminFacilities(0, 100, 'has_schedule=true'))
  }, [dispatch])

  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', p: '1rem' }}>
      <Stack>
        <FormControl fullWidth required margin="normal">
          <InputLabel id="types-select-label">Departments</InputLabel>
          <Select
            label="Departments" 
            value={selectedDepartment}
            onChange={(event) => setSelectedDepartment(event.target.value)}    
          >
            {departments.map((department, index) => (
              <MenuItem value={++index} key={index}>{department}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {facilities.length ? (
        <Box>
          {selectedDepartment === 3 && <Civil 
            setSelected={setSelected}
            selected={selected}
            facilities={formatFacility()}
            />}
        </Box>
      ) : (
        <Skeleton animation="wave" height={300} sx={{ mx: '1rem' }} />
      )}
      <Stack  direction="row" justifyContent="space-between">
        <Box>
          {setSelected && (
            <Stack>
              <Typography variant="overline" >
                Name
              </Typography>
              <Typography variant="body1" >
                {facilities.find(item => item.svg_key === selected)?.name}
              </Typography>
            </Stack>
          )}
        </Box>
        <Button variant="outlined" onClick={() => setSelected('')}>Reset</Button>
      </Stack>
    </Paper>
  )
}

export default Main