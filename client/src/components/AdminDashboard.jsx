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
    const {data:userStatData,isLoading:userStatIsLoading}=useGetUsersStatQuery(fromMonth)
const {data:sessionsData,isLoading:sessionIsLoading}=useGetSessionsSumQuery(fromMonth)
const userStatistics=userStatData?.data,sessions=sessionsData?.data
const dailyRevenueData = {
    labels: sessions?.map(c=>`${c.counselorUsername}- ${c.sessionCount} שיחות`),
    datasets: [{
        label: "פעילות יועצים",
        data: sessions?.map(c=>c.totalDuration),
        backgroundColor: 'rgba(255, 167, 38, 0.5)',
        borderColor: 'rgba(255, 167, 38, 1)',
        borderWidth: 1,
        maxBarThickness: 200,
        
    }]
};

const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);
lastYear.setDate(1)


    const today = new Date();
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    if(sessionIsLoading||userStatIsLoading)return <Loading/>
    return (
        <div className="dashboard-container" >
            <div className="top-cards">
                <Card title="פעילות יועצים"  ClassName="revenue-card">
                    <i 
                     className={`pi ${PrimeIcons.CLOCK}`} 
                    ClassName="card-icon" />
        
                
                    <p style={{ direction: 'rtl', textAlign: 'center' }}>
  {`${Math.floor(sessions?.reduce((acc, c) => acc + c.totalDuration, 0)/60)} שעות שיחה מאז ${searchParams.get('fromMonth')?new Date(searchParams.get('fromMonth')).toLocaleDateString('he-IL'):lastYear.toLocaleDateString('he-IL')}`}
</p>
                </Card>
                {/* <Card title="Weekly Orders" subTitle="65" ClassName="orders-card">
                    <i className={`pi ${PrimeIcons.BOOK}`} ClassName="card-icon" />
                    <p></p>
                </Card> */}
                <Card title="משתמשים חדשים"  ClassName="customers-card">
                    <i className={`pi ${PrimeIcons.USER_PLUS}`} ClassName="card-icon" />
    
                   <p style={{ direction: 'rtl', textAlign: 'center' }}>
  {`${userStatistics?.reduce((acc, month) => acc + month.count, 0)} משתמשים חדשים מאז ${searchParams.get('fromMonth')?new Date(searchParams.get('fromMonth')).toLocaleDateString('he-IL'):lastYear.toLocaleDateString('he-IL')}`}
</p>
                   
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
                {/* <TabPanel header="Daily Orders">
                    <DynamicPieChart></DynamicPieChart>
                </TabPanel> */}
                <TabPanel header="משתמשים חדשים">
                   <UserRegistrationChart users={userStatistics}/>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Dashboard;