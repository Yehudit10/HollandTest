import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import './adminDashboard.css'
import UserRegistrationChart from './UserRegisteration';
import DynamicPieChart from './Pie';
import {useGetUsersQuery, useGetUsersStatQuery} from "../features/users/userApiSlice"
import { useSearchParams } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
const Dashboard = () => {
   
   
const [searchParams,setSearchParams]=useSearchParams()
    const onMonthChange = (e) => { 
        setSearchParams(e.target.value?{fromMonth:(e.target.value).toISOString()}:{})    
      };

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
   
const fromMonth= Object.fromEntries(searchParams.entries());
    const {data:usersData}=useGetUsersStatQuery(fromMonth)
    const today = new Date();
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
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
                <Card title="New Customers"  ClassName="customers-card">
                    <i className={`pi ${PrimeIcons.USER_PLUS}`} ClassName="card-icon" />
                    <p>{usersData?.data[usersData?.data?.length-1]?.count+" new customer this month"}</p>
                </Card>
            </div>
            <Calendar 
        value={searchParams.get('fromMonth')&&new Date(searchParams.get('fromMonth'))}
        onChange={onMonthChange}
        view="month"  
        dateFormat="mm/yy" 
        maxDate={lastMonthEnd} 
        showIcon={true}  
        showButtonBar={true}  
      />
            <TabView>
                <TabPanel header="Daily Revenue">
                    <Chart type="bar" data={dailyRevenueData} options={chartOptions} />
                </TabPanel>
                <TabPanel header="Daily Orders">
                    <DynamicPieChart></DynamicPieChart>
                </TabPanel>
                <TabPanel header="New Customers">
                   <UserRegistrationChart users={usersData?.data}/>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Dashboard;