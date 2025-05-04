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
import { useGetSessionsSumQuery } from '../features/chatSessions/chatSessionApiSlice';
import Loading from './Loading';
const Dashboard = () => {
   
   
const [searchParams,setSearchParams]=useSearchParams()
    const onMonthChange = (e) => { 
        setSearchParams(e.target.value?{fromMonth:(e.target.value).toISOString()}:{})    
      };

   

    const chartOptions = {
   
  scales: {
     y: {
        beginAtZero: true,
       
    }}}
   
const fromMonth= Object.fromEntries(searchParams.entries());
    const {data:usersData}=useGetUsersStatQuery(fromMonth)
const {data:sessionsData,isLoading:sessionIsLoading}=useGetSessionsSumQuery(fromMonth)
const dailyRevenueData = {
    labels: sessionsData?.data.map(c=>`${c.counselorUsername}- ${c.sessionCount} sessions`),
    datasets: [{
        label: 'Counselor Sessions',
        data: sessionsData?.data.map(c=>c.totalDuration),
        backgroundColor: 'rgba(255, 167, 38, 0.5)',
        borderColor: 'rgba(255, 167, 38, 1)',
        borderWidth: 1,
        maxBarThickness: 200,
        
    }]
};
    const today = new Date();
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    if(sessionIsLoading)return <Loading/>
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
      
       {/* <Calendar 
        value={searchParams.get('fromMonth')&&new Date(searchParams.get('fromMonth'))}
        onChange={onMonthChange}
        view="month"  
        dateFormat="mm/yy" 
        maxDate={lastMonthEnd} 
        showIcon={true}  
        showButtonBar={true}  
      /> */}
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