import logo from './logo.svg';
import './App.css';
import Login from './features/auth/login/Login';
import SignUp from './features/users/SignUp';
import HollandInfoPage from './Components/HollandInfoPage';
import HollandPages from './Components/HollandPages';
import HollandPage1 from './Components/HollandPage1';
import { Outlet, Route, Router, Routes } from 'react-router-dom';

import Question from './features/questions/Question';

import HollandResults from './Components/HollandResults';
import NavBar from './Components/NavBar';
import DynamicPieChart from './Components/Pie';
import HollandResults2 from './Components/HollandResult2';
import TestProgressChart from './Components/TestProgress';
import SubjectsList from './features/subjects/SubjecstList';
import FilterSidebar from './Components/FilterSideBar';
import Upload from './Components/Upload';
import UserRegistrationChart from './Components/UserRegisteration';
import UserCard from './features/users/UserCard';
import UsersList from './features/users/UsersList';
import RequireAuth from './features/auth/RequireAuth';
import PersistLogin from './features/auth/PersistLogin';
import AdminDashboard from './Components/AdminDashboard';
import OccupationCard from './Components/OccupationCard';
import OccupationCard2 from './Components/OccupationCard2';
import Dashboard from './Components/AdminDashboard';
import JobList from './features/jobs/JobsList';


function App() {
  return (
    <div className="App">
  {/* <Upload/> */}


   <Routes>
    <Route path="/" element={<>home page</>}/>
     <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/" element={<PersistLogin/>}>
    <Route  element={<RequireAuth allowedRoles={['user','admin']}/>}>
    <Route path="home" element={<><NavBar/><Outlet/></>}>
      <Route path="holland" element={<Outlet/>}>
        <Route index element={<HollandPages/>}/>
      <Route path="holland-info" element={<HollandInfoPage />} />
      <Route path="test" element={<Question/>}/> 
      <Route path="test/result" element={<HollandResults/>}/>
      </Route></Route>
    </Route>
    </Route>
    
  </Routes> 
  {/* <NavBar/>
  <FilterSidebar/> */}
 {/* <HollandResults2/> */}
 {/* <SubjectsList/> */}
  {/* <TestProgressChart /> */}
{/* <DynamicPieChart/> */}
{/* <Question/> */}
{/* <HollandResults/> */}
{/* <HollandPages/> */}

{/* <HollandResults2/> */}

      {/* <HollandInfoPage/> */}
   
    {/* <HollandPage1/> */}
    {/* <RatingPage/> */}
    {/* <Login/> */}
    {/* <UserRegistrationChart/> */}
    {/* <UsersList/> */}
    {/* <AdminDashboard/> */}
  {/* <JobList/> */}
                    {/* <Dashboard/> */}
    </div>
  );
}

export default App;
