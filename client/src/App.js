import logo from './logo.svg';
import './App.css';
import Login from './features/auth/login/Login';
import SignUp from './features/users/SignUp';
import HollandInfoPage from './components/HollandInfoPage';
import HollandPages from './components/HollandPages';
import HollandPage1 from './components/HollandPage1';
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom';

import Question from "./features/hollandTest/questions/Question"
import HollandResults from './features/hollandTest/result/HollandResults';
import NavBar from './components/NavBar';
import DynamicPieChart from './components/Pie';
import HollandResults2 from './components/HollandResult2';
import TestProgressChart from './components/TestProgress';
import SubjectsList from './features/subjects/SubjecstList';
import FilterSidebar from './components/FilterSideBar';
import Upload from './components/Upload';
import UserRegistrationChart from './components/UserRegisteration';
import UserCard from './features/users/UserCard';
import UsersList from './features/users/UsersList';
import RequireAuth from './features/auth/RequireAuth';
import PersistLogin from './features/auth/PersistLogin';
import AdminDashboard from './components/AdminDashboard';
import OccupationCard from './components/OccupationCard';
import OccupationCard2 from './components/OccupationCard2';
import Dashboard from './components/AdminDashboard';
import JobList from './features/jobs/JobsList';
import HomePage from './components/HomePage';
import Profil from './features/users/Profil';
import ViewQuestions from './features/hollandTest/questions/ViewQuestion';
import Edit from './features/users/Edit';
import ProfileCard from './features/users/ProfilCard';


function App() {


  return (
    <div className="App">
      {/* <Upload/> */}


      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PersistLogin />}>
        
    
          <Route element={<RequireAuth allowedRoles={['user', 'admin']} />}>
            <Route path="home" element={<><NavBar /><Outlet /></>}>

            <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route path="view" element={<ViewQuestions/>}/>
        <Route path="dash" element={<AdminDashboard/>}/>
        <Route path="users" element={<UsersList/>}/>
        </Route>

                <Route path="edit" element={<Edit/>}/>
              <Route path="holland" element={<Outlet />}>
                <Route index element={<HollandPages />} />
                <Route path="holland-info" element={<HollandInfoPage />} />
                <Route path="test" element={<Question/>} />
                <Route path="test/result/:resultId" element={<HollandResults />} />
              </Route>
              <Route path="jobs" element={<JobList/>}/>
              
              </Route>
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
