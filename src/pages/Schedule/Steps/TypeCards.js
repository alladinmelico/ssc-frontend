import { Box } from '@mui/system';
import React from 'react'

const TypeCards = ({types, type, setType}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {types.map(item => (
        <div
          className={`type-card ${item.value === type ? 'type-card-active' : ''}`}
          onClick={() => setType(item.value)}
          key={item.value}>
          <img src={item.image} alt={item.name} width="150px" />
          <p>{item.label}</p>
        </div>
      ))}
    </Box>

  )
}

export default TypeCards