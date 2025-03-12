import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

const DynamicPieChart = () => {
  const [data, setData] = useState({
    labels: ['Dark Blue', 'Light Blue', 'Red', 'Light Red', 'Teal', 'Sky Blue'],
    datasets: [
      {
        data: [15, 25, 10, 10, 20, 20], // Example data values
        backgroundColor: [
          '#1e3a8a', // Dark Blue
          '#3b82f6', // Light Blue
          '#f87171', // Red
          '#fb7185', // Light Red
          '#14b8a6', // Teal
          '#60a5fa', // Sky Blue
        ],
        borderColor: '#ffffff',
        borderWidth: 3, // Make the borders more noticeable
        hoverOffset: 10, // Adds a hover effect to enlarge the slice on hover
      },
    ],
  });

  return (
    <div className="pie-chart-container">
      <h3 className="chart-title">Dynamic Pie Chart</h3>
      <Chart
        type="pie"
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14, // Increased font size for better readability
                  family: 'Arial, sans-serif',
                  weight: 'bold',
                },
                boxWidth: 20, // Adjusted size of the legend box
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Show percentage in the tooltip
                },
              },
            },
          },
          maintainAspectRatio: false, // Allow flexibility in the aspect ratio
          animation: {
            animateScale: true, // Animation to make the chart feel more interactive
            animateRotate: true, // Smooth transition when chart rotates
          },
        }}
      />
    </div>
  );
};

export default DynamicPieChart;



