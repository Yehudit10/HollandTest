import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import HollandInfoPage from './Components/HollandInfoPage';
import HollandPages from './Components/HollandPages';
import HollandPage1 from './Components/HollandPage1';
import { Route, Router, Routes } from 'react-router-dom';
import CardSlider from './Components/CardSlider';
import TestComponent from './Components/TestComponent';
import Question from './Components/Question';
import StepDemo from './Components/Step';


function App() {
  return (
    <div className="App">
      {/* <Router> */}
  {/* <Routes>
    <Route path="/" element={<HollandPages/>} /> {/* Replace HomePage with your main page component */}
    {/* <Route path="/holland-info" element={<HollandInfoPage />} /> */}
  {/* </Routes> */} 

{/* <TestComponent/> */}
<Question/>
{/* <StepDemo/> */}
{/* </Router> */}

      {/* <HollandInfoPage/> */}
   
    {/* <HollandPage1/> */}
    {/* <RatingPage/> */}
    </div>
  );
}

export default App;
