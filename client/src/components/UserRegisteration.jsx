import React from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";


const UserRegistrationChart = ({users}) => {


  const data = {
    labels: users?.map(m=>m.month),
    datasets: [
      {
        label: "משתמשים חדשים",
        data: users?.map(m=>m.count),
        backgroundColor: "rgba(100, 181, 246, 0.3)", 
        borderColor: "#1976D2", 
        pointBackgroundColor: "#0D47A1", 
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#333", // Dark text
          font: { size: 14 },
        },
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: { color: "#555", font: { size: 12 } },
        grid: { display: false },
        title: { display: true, text: "חודש", color: "#444", font: { size: 14 } },
      },
      y: {
        ticks: { color: "#555", font: { size: 12 } },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        title: { display: true, text: "מס משתמשים", color: "#444", font: { size: 14 } },
        beginAtZero: true,
      },
    },
  };

  return (
    
    <div >
      <Card  >
        <h3>
          📈 מעקב הרשמת משתמשים
        </h3>
        <div style={{height:"80vh"}}>
             {/* style={{ height: "80vh",width:"50vw" }}> */}
          <Chart style={{height:"100%"}}  type="line" data={data} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default UserRegistrationChart;
