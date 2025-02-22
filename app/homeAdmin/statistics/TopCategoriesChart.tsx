// components/TopCategoriesChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopCategoriesChart = ({ data }) => {
  const chartData = {
    labels: data.map((category) => category.name),
    datasets: [
      {
        label: 'Number of Courses',
        data: data.map((category) => category.count),
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
            position: 'top' as const, // Change the position type to one of the valid options.
        },
        title: {
            display: true,
            text: 'Top Categories',
        },
    },
};

return <Bar data={chartData} options={options} />;
};

export default TopCategoriesChart;
