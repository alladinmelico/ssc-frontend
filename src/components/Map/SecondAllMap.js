import React, {useState} from "react"
import Mech2nd from './Mech2nd'
import Chemtech from './Chemtech'
import Ndt from './Ndt'
import Bsad2nd from './Bsad2nd'
import Comtech from './Comtech'
import Auto from './Auto'
import Electronics from './Electronics'
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SecondAllMap = ({selected, setSelected, facilities}) => {
  const [view, setView] = useState('/map/map-outline.png')

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

  return (
    <Box id="map-container" sx={{ height: "500px", mx: "auto" }}>
      <div id="map-tools">
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
      </div>
      <div id="general-map">
        <img id="gen-map-bg" src={view} alt="tupt map" />
        <div id="sec-gen-map-bsad">
          <Bsad2nd
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="sec-gen-map-mech2nd">
        <Mech2nd
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="sec-gen-map-auto">
        <Auto
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="sec-gen-map-chem">
        <Chemtech
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="sec-gen-map-com">
        <Comtech
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="sec-gen-map-ndt">
        <Ndt
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="sec-gen-map-electronics">
          <Electronics
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
      </div>
    </Box>
  )
}

export default SecondAllMap;