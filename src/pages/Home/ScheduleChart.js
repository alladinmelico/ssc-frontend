import API from 'config/api';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, Card } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const ScheduleChart = () => {

    const [schedulesCount, setSchedulesCount] = useState(0)
    const [schedules, setSchedules] = useState([])
    const [schedulesNow, setSchedulesNow] = useState([])
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getDashboardData = async () => {
        setLoading(true)
        await API.get(`dashboard`).then(res => {
          setSchedules(res.data.schedules_today)
          setSchedulesCount(res.data.schedules_today.length)
          setSchedulesNow(res.data.schedules_now)
          setLoading(false)
        }).catch(err => {
          console.log(err)
        })
      }

    useEffect(() => {
        if (schedulesCount === 0 && !loading) {
            getDashboardData()
        }
    }, [schedulesCount, loading])
    

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
        <>
        <Box sx={{ m: '1rem' }}>
            <Card variant="outlined" sx={{padding:'10px'}}>
                <Pie options={options} data={data} />
            </Card>
        </Box>
        </>
    );
}
 
export default ScheduleChart;