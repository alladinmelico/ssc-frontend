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

  let filteredData = []
  if (facilities) {
    filteredData = [...facilities]
  }
  filteredData = filteredData.sort((first, second) => first.capacity - second.capacity).splice(0, 10)

  const labels = [...filteredData.map((facility) => facility.code)]

  const data = {
    labels,
    datasets: [
      {
        label: "Facility's Capacity",
        data: [...filteredData.map((facility) => facility.capacity)],
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
      title: {
        display: true,
        text: "Top 10 Biggest Room Capacity",
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = filteredData[context.datasetIndex].name
            return label
          }
        }
      }
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
