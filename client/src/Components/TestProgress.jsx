import React from 'react';
import { Chart } from 'primereact/chart';

const TestProgressChart = () => {
    const testHistory = [
        { date: "2024-01-01", Artistic: 75, Realistic: 60, Social: 80, Investigative: 50, Enterprising: 40, Conventional: 55 },
        { date: "2024-02-01", Artistic: 78, Realistic: 65, Social: 85, Investigative: 55, Enterprising: 50, Conventional: 60 },
        { date: "2024-03-01", Artistic: 80, Realistic: 70, Social: 90, Investigative: 60, Enterprising: 55, Conventional: 65 }
    ];
    
    const data = {
        labels: testHistory.map(test => test.date), // Dates of the tests
        datasets: [
            {
                label: 'Artistic',
                data: testHistory.map(test => test.Artistic),
                fill: true,
                borderColor: '#003366',  // Dark blue border
                backgroundColor: 'rgba(0, 51, 102, 0.2)', // Light blue fill
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'Realistic',
                data: testHistory.map(test => test.Realistic),
                fill: true,
                borderColor: '#0066cc',  // Lighter blue border
                backgroundColor: 'rgba(0, 102, 204, 0.2)', // Lighter blue fill
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'Social',
                data: testHistory.map(test => test.Social),
                fill: true,
                borderColor: '#3399ff',  // Soft blue border
                backgroundColor: 'rgba(51, 153, 255, 0.2)', // Soft blue fill
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'Investigative',
                data: testHistory.map(test => test.Investigative),
                fill: true,
                borderColor: '#66ccff',  // Pale blue border
                backgroundColor: 'rgba(102, 204, 255, 0.2)', // Pale blue fill
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'Enterprising',
                data: testHistory.map(test => test.Enterprising),
                fill: true,
                borderColor: '#4d94ff',  // Light blue border
                backgroundColor: 'rgba(77, 148, 255, 0.2)', // Light blue fill
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'Conventional',
                data: testHistory.map(test => test.Conventional),
                fill: true,
                borderColor: '#99ccff',  // Very light blue border
                backgroundColor: 'rgba(153, 204, 255, 0.2)', // Very light blue fill
                tension: 0.4,
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        size: 14,
                        weight: '600'
                    }
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderRadius: 10,
                padding: 10,
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        size: 14,
                        weight: '600',
                    },
                    color: '#003366'
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Score',
                    font: {
                        size: 14,
                        weight: '600',
                    },
                    color: '#003366'
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 10,
                    max: 100,
                },
                grid: {
                    color: '#e6f2ff', // Light grid lines for better contrast
                    borderColor: '#cce0ff',
                    borderWidth: 1,
                }
            }
        },
    };

    return (
        <div className="card" style={{ margin: '20px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '24px', color: '#003366' }}>
                Test Progress Over Time
            </h2>
            <Chart type="line" data={data} options={options} />
        </div>
    );
};

export default TestProgressChart;
