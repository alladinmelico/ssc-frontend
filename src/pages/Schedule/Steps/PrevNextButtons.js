import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function PrevNextButtons ({text, handleBack, isActive}) {
  return (
   <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button
        color="inherit"
        disabled={!isActive}
        onClick={handleBack}
        sx={{ mr: 1 }}
        type="button"
      >
        Cancel
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />

      <Button color="primary" type="submit">{text}</Button>
    </Box>
  );
}