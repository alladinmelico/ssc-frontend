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

const SecondAllMap = ({selected, setSelected, facilities, view}) => {
  return (
    <Box id="map-container" sx={{ height: "500px", mx: "auto" }}>
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