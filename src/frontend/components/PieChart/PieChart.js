import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./PieChart.css";

Chart.register(ArcElement, Tooltip, Legend);

const defaultColors = ["#FFB800", "#BD00FF", "#05FF00", "#FF0000", "#000000"];

const PieChart = ({ labels, data, cutout = 50, colors = defaultColors }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: data,
        backgroundColor: colors,
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
