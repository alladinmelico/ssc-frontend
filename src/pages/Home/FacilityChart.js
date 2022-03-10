import React from "react"
import { useSelector } from "react-redux"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { Box, Card } from "@mui/material"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const FacilityChart = () => {
  const { facilities } = useSelector((state) => state.facilities)

  const labels = [...facilities.map((facility) => facility.name)]

  const data = {
    labels,
    datasets: [
      {
        label: "Facility's Capacity",
        data: [...facilities.map((facility) => facility.capacity)],
        borderColor: ["rgba(255,206,86,0.2)"],
        backgroundColor: ["rgb(0, 86, 98)"],
        hoverBackgroundColor: ["rgb(79, 179, 191)"],
        hoverBorderColor: ["rgb(0,0,0)"],
        hoverBorderWidth: ["2"],
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  }
  return (
    <Box sx={{ m: "1rem" }}>
      <Card variant="outlined" sx={{ color: "#212121" }}>
        <Bar options={options} data={data} />
      </Card>
    </Box>
  )
}

export default FacilityChart
