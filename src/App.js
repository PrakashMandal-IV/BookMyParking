
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Navbar';

import Home from './Pages/Home';
import Login from './Pages/LoginPage';
import { useEffect, useState } from 'react';
import AdminDashboardLayout from './Pages/AdminDashboard/DashboardLayout';
import OverView from './Pages/AdminDashboard/Overview';
import { NoAuthPost } from './components/Api';
import Organization from './Pages/AdminDashboard/Organization';

function App() {
  const nav = useNavigate()
  const [UserData, SetUserData] = useState(null)
  useEffect(() => {
   
    let Email = localStorage.getItem('email')
    let pass = localStorage.getItem('pass')
    if ((Email && pass)) {
      AutoLogin (Email, pass)
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
  return (
    <Routes>
      <Route path='/' element={<Login OnLogin={(data) => OnLogin(data)} />} />
      <Route path='/' element={<Nav UserData={UserData} />}>
        <Route path='home' element={<Home />} />
        {UserData?.IsAdmin && (<Route path='/admin' element={<AdminDashboardLayout />}>
          <Route path='' element={<OverView />} />
          <Route path='organization' element={<Organization />} />
        </Route>)}
      </Route>
    </Routes>
  );
}

export default App;
