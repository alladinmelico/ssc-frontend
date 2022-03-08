import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend} from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { Box, Card } from "@mui/material";
import { getAdminFacilities } from 'actions/facilityActions';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const FacilityChart = () => {

    const { facilities } = useSelector((state) => state.facilities)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getAdminFacilities(0, 100))
    }, [])
    
    const labels = [...facilities.map(facility=> facility.name )];

    const data = {
        labels,
        datasets: [{
            label: "Facility's Capacity",
            data: [...facilities.map(facility=> facility.capacity )],
            borderColor: ['rgba(255,206,86,0.2)'],
            backgroundColor: ['rgb(0, 86, 98)'],
            hoverBackgroundColor:['rgb(79, 179, 191)'],
          }
        ]
      }
      const options = {
        responsive: true,
        plugins: {
            legend: {
              position: 'top',
            },
            scales: {
                y: {
                  beginAtZero: true
                }
              }
        },
    }
    return (
        <>
        <Box sx={{ m: '1rem' }}>
          <Card variant="outlined" sx={{color: "#212121" }}>
            <Bar options={options} data={data} />
          </Card>
        </Box>
        </>
    );
}
 
export default FacilityChart;