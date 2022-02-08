import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

const steps = [
  'Purpose',
  'Facility',
  'People Involved',
  'Notes and attachments',
  'QR Code'
];

export default function ScheduleStepper({activeStep}) {
  return (
    <Box sx={{ width: '100%' }} p={5}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>      
    </Box>
  );
}