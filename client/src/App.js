import logo from './logo.svg';
import './App.css';
import Login from './features/auth/login/Login';
import SignUp from './features/users/SignUp';
import HollandInfoPage from './components/HollandInfoPage';
import HollandPages from './components/HollandPages';
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom';

import Question from "./features/hollandTest/questions/Question"
import HollandResults from './features/hollandTest/result/HollandResults';
import NavBar from './components/NavBar';

import UsersList from './features/users/UsersList';
import RequireAuth from './features/auth/RequireAuth';
import PersistLogin from './features/auth/PersistLogin';
import AdminDashboard from './components/AdminDashboard';


import JobList from './features/jobs/JobsList';


import ViewQuestions from './features/hollandTest/questions/ViewQuestion';
import Edit from './features/users/Edit';

import ViewResults from './features/hollandTest/result/ViewResults';
import Favoraites from './components/Favoraites';
import AddCounsler from './features/users/AddCounsler';

import CounselorChatApp from './components/CounslerChatApp';
import ChatApp from './components/ChatApp';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Toast } from 'primereact/toast';


import React, { useRef, useEffect } from 'react';

import { setToastRef } from './components/toastService';
import JobManager from './features/jobs/JobManager';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
function App() {

  const toast = useRef(null);

  useEffect(() => {
    setToastRef(toast.current);
  }, []);
  return (
    <div className="App">
      {/* <ToastContainer style={{ zIndex: 9999 }} /> */}
      <Toast  position="bottom-right" ref={toast}/>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PersistLogin />}>
        

          <Route element={<RequireAuth allowedRoles={['user', 'admin','counselor']} notActiveAllowed={true} />}> 
          <Route path="home" element={<><NavBar /><Outlet /></>}>
           
              <Route path="edit" element={<Edit/>}/>
                <Route element={<RequireAuth allowedRoles={['user', 'admin','counselor']} notActiveAllowed={false} />}> 
               
                <Route index element={<Home/>}/>
                <Route path="userchat" element={<ChatApp/>}/>
                <Route path="favoraites" element={<Favoraites/>}/>
                <Route path="jobs" element={<JobList/>}/>
                <Route path="holland" element={<Outlet />}>
                <Route index element={<HollandPages />} />
                <Route path="holland-info" element={<HollandInfoPage />} />
                <Route path="test" element={<Question/>} />
                <Route path="results" element={<ViewResults/>}/>
                <Route path="results/:resultId" element={<HollandResults />} />
                
                </Route>
                <Route element={<RequireAuth allowedRoles={['counselor','admin']} notActiveAllowed={false}/>}>
                    <Route path="counselorchat" element={<CounselorChatApp/>}/></Route>
                <Route element={<RequireAuth allowedRoles={['admin']} notActiveAllowed={false}/>}>
                <Route path="statistics" element={<AdminDashboard/>}/>
                      <Route path="viewjobs" element={<JobManager/>}/>
                      <Route path="questions" element={<ViewQuestions/>}/>
                      <Route path="counsler-register" element={<AddCounsler/>}/>
                      <Route path="users" element={<UsersList/>}/>

              </Route>
              
              </Route>
              
          </Route>
        </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
