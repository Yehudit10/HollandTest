import React, { useState } from 'react';
import { Chart } from 'primereact/chart';
import { useGetSessionsSumQuery } from '../../features/chatSessions/chatSessionApiSlice';
import { useSearchParams } from 'react-router-dom';
import Loading from '../generals/Loading';

const DynamicPieChart = ({data}) => {



//   const generateColors = (count) => {
//     const colors = [];
//     for (let i = 0; i < count; i++) {
//       const hue = Math.floor((360 / count) * i);
//       colors.push(`hsl(${hue}, 70%, 60%)`);
//     }
//     return colors;
//   };
//   const [searchParams]=useSearchParams()
//   const fromMonth= Object.fromEntries(searchParams.entries());
//   const {data:sessionsData,isLoading:sessionIsLoading}=useGetSessionsSumQuery(fromMonth)
//   const sessions=sessionsData?.data||[]
// const total=sessions?.reduce((acc, c) => acc + c.totalDuration, 0)
// const backgroundColors = generateColors(sessions?.length);

// const [data, setData] = useState({
//   labels: sessions?.map(c=>` סה"כ ${Math.floor(c.totalDuration) }דקות  שיחות  ${c.counselorUsername}- ${c.sessionCount} `),
//   datasets: [
//     {
//       data: sessions.map(c => ((c.totalDuration * 100) / total).toFixed(2)),
//       backgroundColor: [
//         '#1e3a8a', // Dark Blue
//         '#3b82f6', // Light Blue
//         '#f87171', // Red
//         '#fb7185', // Light Red
//         '#14b8a6', // Teal
//         '#60a5fa', // Sky Blue
//       ],
//      // backgroundColor: backgroundColors,
//       borderColor: '#ffffff',
//       borderWidth: 3, 
//       hoverOffset: 10, 
//     },
//   ],
// });
//   const dailyRevenueData = {
//     labels: sessions?.map(c=>`${c.counselorUsername}- ${c.sessionCount} שיחות`),
//     datasets: [{
//         label: "פעילות יועצים",
//         data: sessions?.map(c=>c.totalDuration/total),
//         backgroundColor: backgroundColors,//'rgba(255, 167, 38, 0.5)',
//         borderColor: 'rgba(255, 167, 38, 1)',
//         borderWidth: 1,
//         maxBarThickness: 200,
        
//     }]
// };


// if(sessionIsLoading)
// return <Loading/>
  return (
    <div className="pie-chart-container">
      <h3 className="chart-title">פעילות יועצים</h3>
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
                  size: 14, 
                  family: 'Arial, sans-serif',
                  weight: 'bold',
                },
                boxWidth: 20, 
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`; 
                },
              },
            },
          },
          maintainAspectRatio: false, 
          animation: {
            animateScale: true, 
            animateRotate: true, 
          },
        }}
      />
    </div>
  );
};

export default DynamicPieChart;



