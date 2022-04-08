import React from "react";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
Chart.defaults.font.size = 10;
Chart.defaults.font.family = "'Saira', sans-serif";
Chart.defaults.color = "white";

const BarChart = ({ label, categories, values }) => {
  const data = {
    labels: categories,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        barThickness: 30,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "'Saira', sans-serif",
          },
          color: "white",
          boxWidth: 0,
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
