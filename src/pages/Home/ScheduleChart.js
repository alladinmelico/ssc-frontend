import API from 'config/api';
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, Card } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const ScheduleChart = ({schedules, schedulesNow}) => {    

    const data = {
        labels: ['Total number of schedule Today','Total number of schedule Now'],
        datasets: [{
            label: 'Count',
            data: [schedules.length, schedulesNow.length],
            borderColor: ['rgba(255,206,86,0.2)'],
            backgroundColor: ['rgb(0, 86, 98)',
              'rgb(79, 179, 191)'],
            hoverBorderColor:['rgb(0,0,0)'],
          }
        ]
      }
      const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
    }
    return (
      <Box sx={{ m: '1rem' }}>
        <Card variant="outlined" sx={{padding:'10px'}}>
          <Pie options={options} data={data} />
        </Card>
      </Box>
    );
}
 
export default ScheduleChart;