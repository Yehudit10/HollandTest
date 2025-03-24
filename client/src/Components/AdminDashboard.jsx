import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import './adminDashboard.css'
import UserRegistrationChart from './UserRegisteration';
import DynamicPieChart from './Pie';

const Dashboard = () => {
    // נתונים סטטיסטיים לדוגמה
    const weeklyRevenue = 1930;
    const weeklyOrders = 65;
    const newCustomers = 107;

    const dailyRevenueData = {
        labels: ['Jul 17, 2023', 'Jul 18, 2023', 'Jul 19, 2023', 'Jul 20, 2023', 'Jul 21, 2023', 'Jul 22, 2023', 'Jul 24, 2023'],
        datasets: [{
            label: 'Daily Revenue',
            data: [8, 12, 12, 9, 13, 4, 12],
            backgroundColor: 'rgba(255, 167, 38, 0.5)',
            borderColor: 'rgba(255, 167, 38, 1)',
            borderWidth: 1
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="dashboard-container">
            <div className="top-cards">
                <Card title="Weekly Revenue" subTitle="$ 1930" ClassName="revenue-card">
                    <i className={`pi ${PrimeIcons.DOLLAR}`} ClassName="card-icon" />
                    <p>-4% since last week</p>
                </Card>
                <Card title="Weekly Orders" subTitle="65" ClassName="orders-card">
                    <i className={`pi ${PrimeIcons.SHOPPING_CART}`} ClassName="card-icon" />
                    <p>+231% since last week</p>
                </Card>
                <Card title="New Customers" subTitle="107" ClassName="customers-card">
                    <i className={`pi ${PrimeIcons.USER_PLUS}`} ClassName="card-icon" />
                    <p>+103% since last week</p>
                </Card>
            </div>

            <TabView>
                <TabPanel header="Daily Revenue">
                    <Chart type="bar" data={dailyRevenueData} options={chartOptions} />
                </TabPanel>
                <TabPanel header="Daily Orders">
                    <DynamicPieChart></DynamicPieChart>
                </TabPanel>
                <TabPanel header="New Customers">
                   <UserRegistrationChart/>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Dashboard;