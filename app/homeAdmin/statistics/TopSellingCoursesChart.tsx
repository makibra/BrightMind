// components/TopSellingCoursesChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopSellingCoursesChart = ({ data }) => {
  const chartData = {
    labels: data.map((course) => course.name),
    datasets: [
      {
        label: 'Sales',
        data: data.map((course) => course.sales),
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
        text: 'Top Selling Courses',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Courses',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TopSellingCoursesChart;
