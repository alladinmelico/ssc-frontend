import React, {useState} from "react"
import Bsad from './Bsad'
import Beng from './Beng'
import Civil from './Civil'
import Mech from './Mech'
import Electrical from './Electrical'
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AllMap = ({selected, setSelected, facilities}) => {
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
        <div id="gen-map-bsad">
          <Bsad
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="gen-map-beng">
        <Beng
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="gen-map-civil">
        <Civil
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="gen-map-mech">
        <Mech
            setSelected={setSelected}
            selected={selected}
            facilities={facilities}
            hasShadow={true}
          />
        </div>
        <div id="gen-map-electrical">
          <Electrical
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

export default AllMap;