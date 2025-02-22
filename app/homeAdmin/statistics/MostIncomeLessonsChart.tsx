// components/MostIncomeLessonsChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MostIncomeLessonsChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.name),
    datasets: [
      {
        label: 'Income',
        data: data.map(entry => entry.sales * entry.price),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Most Income-Generating Lessons',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Lesson',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Income DA',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MostIncomeLessonsChart;
