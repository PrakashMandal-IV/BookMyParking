
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Navbar';

import Home from './Pages/Home';
import Login from './Pages/LoginPage';
import { useEffect, useRef, useState } from 'react';
import AdminDashboardLayout from './Pages/AdminDashboard/DashboardLayout';
import OverView from './Pages/AdminDashboard/Overview';
import { NoAuthPost } from './components/Api';
import Organization from './Pages/AdminDashboard/Organization';
import AgentDashboardLayout from './Pages/AgentDashboard/DashboardLayout';
import AgentOverView from './Pages/AgentDashboard/Overview';
import ManageParking from './Pages/AgentDashboard/ManageParking';
import Finance from './Pages/AgentDashboard/Finance';
import RegisterUser from './Pages/RegisterUser';
import BookParking from './Pages/Customer/BookParking';

function App() {
  const nav = useNavigate()
  const [UserData, SetUserData] = useState(null)
  
  useEffect(() => {
  
    let Email = localStorage.getItem('email')
    let pass = localStorage.getItem('pass')
    if ((Email && pass)) {
      AutoLogin (Email, pass)
    }else{
      nav('/login')
    }
  }, [])
  const AutoLogin = (email, pass) => {

    var det = {
      "link": "User/Login?Email=" + email + "&Password=" + pass
    }
    NoAuthPost(det, (res, rej) => {
      if (res.data.length !== 0) {
        localStorage.setItem('email', email)
        localStorage.setItem('pass', pass)
        sessionStorage.setItem('token', res.data[0].Token)
        SetUserData(res.data[0])
       
      }
    }, (err) => {
    });
  }
  function OnLogin(UserData) {
    SetUserData(UserData)
    nav('/home')
  }
  function Logout(){
    SetUserData(null)
    localStorage.clear()
    nav('/login')
  }
  return (
    <Routes>
      <Route exact path='/' element={<Nav UserData={UserData}  Logout={Logout}/>}>
      <Route exact path='login' element={<Login OnLogin={(data) => OnLogin(data)} />} />
      <Route exact path='register' element={<RegisterUser OnLogin={(data) => OnLogin(data)} />} />
        <Route exact path='home' element={<Home />} />
        <Route exact path='bookmyparking' element={<BookParking />} />
        
        {UserData?.IsAdmin && (<Route path='admin' element={<AdminDashboardLayout />}>
          <Route path='' element={<OverView />} />
          <Route path='organization' element={<Organization />} />
        </Route>)}
        {UserData?.IsAgent && (<Route path='agent' element={<AgentDashboardLayout />}>
          <Route path='' element={<AgentOverView />} />
          <Route path='manageparking' element={<ManageParking />} />
          <Route path='finance' element={<Finance />} />
        </Route>)}
      </Route>
    </Routes>
  );
}

export default App;
