import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import HollandInfoPage from './Components/HollandInfoPage';
import HollandPages from './Components/HollandPages';
import HollandPage1 from './Components/HollandPage1';
import { Route, Router, Routes } from 'react-router-dom';

import Question from './Components/Question';

import HollandResults from './Components/HollandResults';
import NavBar from './Components/NavBar';
import DynamicPieChart from './Components/Pie';
import HollandResults2 from './Components/HollandResult2';
import TestProgressChart from './Components/TestProgress';


function App() {
  return (
    <div className="App">
      {/* <Router> */}
  {/* <Routes>
    <Route path="/" element={<HollandPages/>} /> {/* Replace HomePage with your main page component */}
    {/* <Route path="/holland-info" element={<HollandInfoPage />} /> */}
  {/* </Routes> */} 
  <TestProgressChart />
{/* <NavBar/> */}
{/* <DynamicPieChart/> */}
{/* <Question/> */}
{/* <HollandResults/> */}

{/* </Router> */}
{/* <HollandResults2/> */}

      {/* <HollandInfoPage/> */}
   
    {/* <HollandPage1/> */}
    {/* <RatingPage/> */}
    </div>
  );
}

export default App;
