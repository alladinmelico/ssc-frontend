import React from "react"
import Bsad from './Bsad'
import Beng from './Beng'
import Civil from './Civil'
import Mech from './Mech'
import Electrical from './Electrical'
import Box from '@mui/material/Box';

const AllMap = ({selected, setSelected, facilities}) => {

  return (
    <Box sx={{ height: "500px", mx: "auto" }}>
      <div id="general-map">
        <img id="gen-map-bg" src="/general-map.png" alt="tupt map" />
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