import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import './adminDashboard.css'
import UserRegistrationChart from './UserRegisteration';
import DynamicPieChart from './Pie';
import {useGetUsersQuery, useGetUsersStatQuery} from "../../features/users/userApiSlice"
import { useSearchParams } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { useGetSessionsSumQuery } from '../../features/chatSessions/chatSessionApiSlice';
import Loading from '../generals/Loading';
import { useGetAllResultQuery } from '../../features/hollandTest/result/resultApiSlice';
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

const {data:testsStatData,isLoading:testStatIsLoading}=useGetAllResultQuery(fromMonth)
const userStatistics=userStatData?.data,sessions=sessionsData?.data,tests=testsStatData?.data
const totalSessions=sessions?.reduce((acc, c) => acc + c.totalDuration, 0)
const dailyRevenueData = {
    labels: tests?.map(c=>c.month),
    datasets: [{
        label: "מספר מבחנים",
        data: tests?.map(c=>c.count),
        backgroundColor: 'rgba(255, 167, 38, 0.5)',
        borderColor: 'rgba(255, 167, 38, 1)',
        borderWidth: 1,
        maxBarThickness: 200,
        
    }]
};

const coundelorData={
    labels: sessions?.map(c=>` סה"כ ${Math.floor(c.totalDuration) }דקות  שיחות  ${c.counselorUsername}- ${c.sessionCount} `),
    datasets: [
      {
        data: sessions?.map(c => ((c.totalDuration * 100) / totalSessions).toFixed(2)),
        backgroundColor: [
          '#1e3a8a', // Dark Blue
          '#3b82f6', // Light Blue
          '#f87171', // Red
          '#fb7185', // Light Red
          '#14b8a6', // Teal
          '#60a5fa', // Sky Blue
        ],
       // backgroundColor: backgroundColors,
        borderColor: '#ffffff',
        borderWidth: 3, 
        hoverOffset: 10, 
      },
    ],
  }


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
                <Card title="מבחנים חדשים"  ClassName="customers-card">
                    <i className={`pi ${PrimeIcons.BOOK}`} ClassName="card-icon" />
    
                   <p style={{ direction: 'rtl', textAlign: 'center' }}>
  {`${tests?.reduce((acc, month) => acc + month.count, 0)} מבחנים חדשים מאז ${searchParams.get('fromMonth')?new Date(searchParams.get('fromMonth')).toLocaleDateString('he-IL'):lastYear.toLocaleDateString('he-IL')}`}
</p>
                   
                </Card>
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
    
            <TabView style={{ direction: 'rtl' }}>
            <TabPanel header="משתמשים חדשים">
                   <UserRegistrationChart users={userStatistics}/>
                </TabPanel>
                <TabPanel header="מבחנים חדשים">
                <Chart type="bar" data={dailyRevenueData} options={chartOptions} />
                </TabPanel>
                <TabPanel header="פעילות יועצים">
                <DynamicPieChart data={coundelorData}></DynamicPieChart>
                    
                </TabPanel>
               
               
            </TabView>
        </div>
    );
};

export default Dashboard;