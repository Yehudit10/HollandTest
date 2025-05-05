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
    const {data:usersData,isLoading:userIsLoading}=useGetUsersStatQuery(fromMonth)
const {data:sessionsData,isLoading:sessionIsLoading}=useGetSessionsSumQuery(fromMonth)
const dailyRevenueData = {
    labels: sessionsData?.data.map(c=>`${c.counselorUsername}- ${c.sessionCount} שיחות`),
    datasets: [{
        label: "פעילות יועצים",
        data: sessionsData?.data.map(c=>c.totalDuration),
        backgroundColor: 'rgba(255, 167, 38, 0.5)',
        borderColor: 'rgba(255, 167, 38, 1)',
        borderWidth: 1,
        maxBarThickness: 200,
        
    }]
};
    const today = new Date();
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    if(sessionIsLoading||userIsLoading)return <Loading/>
    return (
        <div className="dashboard-container" >
            <div className="top-cards">
                <Card title="פעילות יועצים"  ClassName="revenue-card">
                    <i 
                     className={`pi ${PrimeIcons.CLOCK}`} 
                    ClassName="card-icon" />
                    <p>{"דקות שיחה בחודש הנוכחי"+Math.floor(sessionsData?.data?.reduce((acc, c) => acc + c.totalDuration, 0))}</p>
                </Card>
                <Card title="Weekly Orders" subTitle="65" ClassName="orders-card">
                    <i className={`pi ${PrimeIcons.BOOK}`} ClassName="card-icon" />
                    <p></p>
                </Card>
                <Card title="משתמשים חדשים"  ClassName="customers-card">
                    <i className={`pi ${PrimeIcons.USER_PLUS}`} ClassName="card-icon" />
                    <p>{" משתמשים חדשים בחודש הנוכחי"+usersData?.data[usersData?.data?.length-1]?.count}</p>
                 
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
            <TabView style={{ direction: 'rtl' }}>
                <TabPanel header="פעילות יועצים">
                    <Chart type="bar" data={dailyRevenueData} options={chartOptions} />
                </TabPanel>
                <TabPanel header="Daily Orders">
                    <DynamicPieChart></DynamicPieChart>
                </TabPanel>
                <TabPanel header="משתמשים חדשים">
                   <UserRegistrationChart users={usersData?.data}/>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Dashboard;