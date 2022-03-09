import React, { useEffect, useState } from 'react'
import Beng from './Beng'
import Bsad from './Bsad'
import Civil from './Civil'
import Comtech from './Comtech'
import Mech from './Mech'
import Auto from './Auto'
import Electrical from './Electrical'
import Electronics from './Electronics'
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Mech2nd from './Mech2nd'
import Chemtech from './Chemtech'
import Ndt from './Ndt'
import Bsad2nd from './Bsad2nd'
import AllMap from './AllMap'
import Switch from '@mui/material/Switch'

const Main = ({selected, setSelected, selectedDepartment, setSelectedDepartment, showDetails}) => {
  const dispatch = useDispatch()

  const [floor, setFloor] = useState(1)
  const [showWholeMap, setShowWholeMap] = useState(false)

  const { facilities } = useSelector((state) => state.facilities)
  
  const departments = ['Bachelor of Engineering and Allied Department',
    'Basic Arts and Sciences Department',
    'Civil and Allied Department',
    'Electrical and Allied Department',
    'Mechanical and Allied Department',
  ]

  const legends = [
    {
      label: 'Available',
      color: '#ededed',
    },
    {
      label: 'Selected',
      color: '#00838f',
    },
    {
      label: '0% - 50% occupied',
      color: '#aed581',
    },
    {
      label: '51% - 80% occupied',
      color: '#ffc107',
    },
    {
      label: '81% - 100% occupied',
      color: '#ef5350',
    },
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
            onChange={(event) => { 
              setFloor(1)
              setSelectedDepartment(event.target.value)
            }}    
          >
            {departments.map((department, index) => (
              <MenuItem value={++index} key={index}>{department}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {facilities.length ? (
        <Box>
          {showWholeMap ? (
            <AllMap
              setSelected={setSelected}
              selected={selected}
              facilities={formatFacility()}
            />
          ) : (
            <Box>
              {(selectedDepartment === 1 && floor == 1) && <Beng 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 1 && floor == 2) && <Auto 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 2 && floor == 1) && <Bsad 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 2 && floor == 2) && <Bsad2nd 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 3 && floor == 1) && <Civil 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 3 && floor == 2) && <Comtech 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 4 && floor == 1) && <Electrical 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 5 && floor == 1) && <Mech 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 5 && floor == 2) && <Mech2nd 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 5 && floor == 3) && <Chemtech 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 5 && floor == 4) && <Ndt 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 4 && floor == 2) && <Electronics
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}            
            </Box>          
          )}
        </Box>
      ) : (
        <Skeleton animation="wave" height={300} sx={{ mx: '1rem' }} />
      )}
      <Stack  direction="row" justifyContent="space-between">
        {selected && (
          <Box>
            <Stack>
              <Typography variant="overline" >
                Name
              </Typography>
              <Typography variant="body1" >
                {facilities.find(item => item.svg_key === selected)?.name}
              </Typography>
            </Stack>
          </Box>
        )}
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Floor</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={floor}
            onChange={(event) => setFloor(event.target.value)}
          >
            <FormControlLabel value={1} control={<Radio />} label="First" />
            <FormControlLabel value={2} control={<Radio />} label="Second" />
            {selectedDepartment === 5 && 
              <FormControlLabel value={3} control={<Radio />} label="Chem Tech" />}
            {selectedDepartment === 5 && 
              <FormControlLabel value={4} control={<Radio />} label="NDT" />}
          </RadioGroup>
        </FormControl>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={showWholeMap}
                onChange={(event) => setShowWholeMap(event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Show Campus Map"
          />         
          <Button variant="outlined" onClick={() => setSelected('')}>Reset Selected Facility</Button>
        </Box>
      </Stack>
      <Typography variant="overline" mt={2}>Legends</Typography>
      <Stack  direction="row" justifyContent="space-between">
        {legends.map(legend => (
          <Box key={legend.label} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FiberManualRecordIcon fontSize="small" sx={{ color: legend.color }} />
            <Typography variant="caption">{legend.label}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}

export default Main