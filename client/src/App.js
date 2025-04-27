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
import ViewResults from './features/hollandTest/result/ViewResults';
import Favoraites from './components/Favoraites';


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PersistLogin />}>
        

          <Route element={<RequireAuth allowedRoles={['user', 'admin']} />}>
            <Route path="home" element={<><NavBar /><Outlet /></>}>

            <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="stat" element={<AdminDashboard/>}/>
        <Route path="view" element={<ViewQuestions/>}/>
        
        <Route path="users" element={<UsersList/>}/>
        </Route>


                <Route path="favoraites" element={<Favoraites/>}/>
                <Route path="edit" element={<Edit/>}/>
               <Route path="holland" element={<Outlet />}>
                <Route index element={<HollandPages />} />
                <Route path="holland-info" element={<HollandInfoPage />} />
                <Route path="test" element={<Question/>} />
                <Route path="results" element={<ViewResults/>}/>
                <Route path="results/:resultId" element={<HollandResults />} />
              </Route>
              <Route path="jobs" element={<JobList/>}/>
              
              </Route>
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
