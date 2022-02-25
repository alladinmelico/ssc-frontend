import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DashboardCard = ({number, title, icon, backgroundColor, borderColor}) => {
  return (
    <Box sx={{ m: '1rem' }}>
      <Card variant="outlined" sx={{ backgroundColor, borderColor, color: "#212121" }}>
        <CardContent>
          {icon}
          <Typography variant="h2">
            {number}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
export default DashboardCard
