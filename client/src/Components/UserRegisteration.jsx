import React from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";

const UserRegistrationChart = ({users}) => {
const monthes=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","","Sep","Oct","Nov","Dec"]
  const data = {
    labels: [],
    datasets: [
      {
        label: "User Registrations",
        data: [20, 50, 120, 300, 500, 700], // Replace with real data
        backgroundColor: "rgba(100, 181, 246, 0.3)", // Light blue fill
        borderColor: "#1976D2", // Blue line
        pointBackgroundColor: "#0D47A1", // Dark blue points
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4, // Smooth curve
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
        title: { display: true, text: "Months", color: "#444", font: { size: 14 } },
      },
      y: {
        ticks: { color: "#555", font: { size: 12 } },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        title: { display: true, text: "Users", color: "#444", font: { size: 14 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div >
      <Card  >
        <h3>
          📈 User Registrations Over Time
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
