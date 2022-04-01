import React from 'react'
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2'
import "./PieChart.css"

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ( {labels} ) => {

  const data = {
    labels: ["Case on Hold", "Submitted", "In Production", "Shipped"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5],
        backgroundColor: ["#BD00FF", "#05FF00", "#FF0000", "#FFB800"],
        borderColor: ["#BD00FF", "#05FF00", "#FF0000", "#FFB800"],
        borderWidth: 0,
        weight: 1,
        
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    cutout: 50,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10,
            family: "'Saira', sans-serif"
          },
          color: "white",
          boxWidth: 10,
        },
        position: "left"
      },
    },
  };
  return (
    <Doughnut 
    data={data}
    options={options}
    />
  )
}

export default PieChart