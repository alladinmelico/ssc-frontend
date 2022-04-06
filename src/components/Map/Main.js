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
import SecondAllMap from './SecondAllMap'
import Switch from '@mui/material/Switch'
import { makeStyles } from '@mui/styles';
import GalleryModal from '../Modal/GalleryModal';
import FacilityMapDetailsModal from './FacilityMapDetailsModal'
import {DEPARTMENTS} from 'constants/facility'

const Main = ({selected, setSelected, selectedDepartment, setSelectedDepartment, showDetails}) => {
  const dispatch = useDispatch()
  const [view, setView] = useState('/map/map-outline.png')
  const [floor, setFloor] = useState(1)
  const [showWholeMap, setShowWholeMap] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [data, setData] = useState({})

  const { facilities, count } = useSelector((state) => state.facilities)

  const facility = () => {
    setData(facilities.find(item => item.svg_key === selected));
  }
  
  const useStyles = makeStyles({
    resetButton:{
    maxWidth: '100%',
      "@media (max-width: 576px)": {
      maxWidth: '300px',
      alignContent: "center",
      }
    },
  });

const classes = useStyles();

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

   const views = [
    {
     value: 'Outline',
     map: '/map/map-outline.png'
    },
    {
     value: 'Colored',
     map: '/map/map-color.png'
    },
    {
     value: 'Satellite',
     map: '/map/map-satellite.png'
    },
  ]

  const [showModal,setShowModal] = useState(false);
    
    function showModalHandler(){
        setShowModal(showModal);
    }

  function formatFacility () {
    const temp = {}
    
    facilities.filter(facility => facility.svg_key !== null && facility.department_id === selectedDepartment)
    .forEach(facility => {
      temp[facility.svg_key] = {...facility}
    })

    return temp
  }

  useEffect(() => {
    if (!count) {
      dispatch(getAdminFacilities(0, 100, 'has_schedule=true'))
      console.log(selected)
    }
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
            {DEPARTMENTS.map((department) => (
              <MenuItem value={department.id} key={department.id}>{department.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {facilities && facilities.length ? (
        <Box>
          {(showWholeMap) ? (
            <Box>
              {(floor == 1) && <AllMap
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                view={view}
                />}
              {(floor == 2) && <SecondAllMap
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                view={view}
                />}
            </Box>
          ) : (
            <Box>
              {(selectedDepartment === 1 && floor == 1) && 
               <div id="map-rot">
                <Beng 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>}
              {(selectedDepartment === 1 && floor == 2) && <Auto 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 2 && floor == 1) && 
              <div id="map-rot">
                <Bsad 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>}
              {(selectedDepartment === 2 && floor == 2) && 
              <div id="map-rot">
                <Bsad2nd 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>}
              {(selectedDepartment === 3 && floor == 1) && 
              <div id="map-rot">
                <Civil 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>}
              {(selectedDepartment === 3 && floor == 2) && 
              <div id="map-rotate">
                <Comtech 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>}
              {(selectedDepartment === 4 && floor == 1) && <Electrical 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}
              {(selectedDepartment === 4 && floor == 2) && <Electronics
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />}            
              {(selectedDepartment === 5 && floor == 1) && 
              <div id="map-rot">
                <Mech 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>}
              {(selectedDepartment === 5 && floor == 2) && 
              <div id="map-rot">
                <Mech2nd 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>}
              {(selectedDepartment === 5 && floor == 3) && 
              <div id="map-rot">
                <Chemtech 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>}
              {(selectedDepartment === 5 && floor == 4) && 
              <div id="map-rot">
                <Ndt 
                setSelected={setSelected}
                selected={selected}
                facilities={formatFacility()}
                />
                </div>
                }
            </Box>          
          )}
        </Box>
      ) : (
        <Skeleton animation="wave" height={300} sx={{ mx: '1rem' }} />
      )}
      <Stack  direction="row" justifyContent="space-between">
        {(selected && facilities.find(item => item.svg_key === selected)) && (
          <Box>
            <Stack>
              <Typography variant="overline" >
                Facility
              </Typography>
              <Typography variant="body1" >
              <Button onClick={() => {
                facility()
            setViewModal(true)}}>
            {facilities.find(item => item.svg_key === selected)?.name}</Button>
            {viewModal && <FacilityMapDetailsModal facility={data} modalClosed={() => {setViewModal(false) }}/>}
                
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
        {showWholeMap && (
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">View</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={view}
              onChange={(event) => setView(event.target.value)}
            >
              {views.map(view => (
                <FormControlLabel key={view.value} value={view.map} control={<Radio size="small" />} label={view.value} />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        <Box sx={{mx:"auto", mt:"1rem"}}>
          <Stack  direction={{ xs: 'column', md: 'row', lg: 'row', }}  spacing={2}>
            <FormControlLabel sx={{mx:"auto"}}
            control={
              <Switch
                checked={showWholeMap}
                onChange={(event) => setShowWholeMap(event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Show Campus Map"
          />
          <GalleryModal selectedDepartment={selectedDepartment} />
          <Button classname={classes.resetButton} variant="outlined" onClick={() => setSelected('')}>Reset Selected Facility</Button>
          </Stack>
        </Box>
      </Stack>
      <Typography variant="overline" mt={2}>Legends</Typography>
      <Stack justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      direction={{ xs: 'column', md: 'row', lg: 'row', }}
      >
        {legends.map(legend => (
          <Box key={legend.label} sx={{maxWidth:"100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FiberManualRecordIcon fontSize="small" sx={{ color: legend.color }} />
            <Typography variant="caption">{legend.label}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}

export default Main