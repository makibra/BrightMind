// components/PlatformUsageChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PlatformUsageChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.month),
    datasets: [
      {
        label: 'Website',
        data: data.map(entry => entry.website),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Mobile App',
        data: data.map(entry => entry.mobileApp),
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      }
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
        text: 'Platform Usage Over the Last 6 Months',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Users',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PlatformUsageChart;
