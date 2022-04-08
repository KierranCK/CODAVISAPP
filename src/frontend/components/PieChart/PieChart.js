import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./PieChart.css";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels, data, cutout = 50 }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: [data.cases.active, data.cases.critical],
        backgroundColor: [
          "#BD00FF",
          "#05FF00",
          "#FF0000",
          "#FFB800",
          "#000000",
        ],
        borderColor: ["#BD00FF", "#05FF00", "#FF0000", "#FFB800", "#000000"],
        borderWidth: 0,
        weight: 1,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    cutout: cutout,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10,
            family: "'Saira', sans-serif",
          },
          color: "white",
          boxWidth: 10,
        },
        position: "left",
      },
    },
  };
  return <Doughnut data={chartData} options={options} />;
};

export default PieChart;
