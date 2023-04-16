
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
import AgentDashboardLayout from './Pages/AgentDashboard/DashboardLayout';
import AgentOverView from './Pages/AgentDashboard/Overview';
import ManageParking from './Pages/AgentDashboard/ManageParking';
import Finance from './Pages/AgentDashboard/Finance';
import RegisterUser from './Pages/RegisterUser';
import BookParking from './Pages/Customer/BookParking';
import BookingConfirmationPage from './Pages/Customer/BookingConfirmationPage';
import MyAccount from './Pages/MyAccount/MyAccount';
import MyAccountDashboardLayout from './Pages/MyAccount/DashboardLayout';
import MyBookings from './Pages/MyAccount/MyBookings';
import Vehicle from './Pages/MyAccount/Vehicles';


function App() {
  const nav = useNavigate()
  const [UserData, SetUserData] = useState(null)

  useEffect(() => {
    let Email = localStorage.getItem('email')
    let pass = localStorage.getItem('pass')
    if ((Email && pass)) {
      AutoLogin(Email, pass)
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
  function Logout() {
    SetUserData(null)
    localStorage.clear()
    nav('/')
  }

  const OnUpdateName=()=>{
    let Email = localStorage.getItem('email')
    let pass = localStorage.getItem('pass')
    if ((Email && pass)) {
      AutoLogin(Email, pass)
    }
  }

  return (
    <Routes>
      <Route exact path='/' element={<Nav UserData={UserData}  />}>
        <Route exact path='/' element={<Login OnLogin={(data) => OnLogin(data)} />} />
        <Route exact path='register' element={<RegisterUser OnLogin={(data) => OnLogin(data)} />} />
        <Route exact path='home' element={<Home />} />
        <Route exact path='bookmyparking' element={<BookParking />} />
        <Route exact path='/account' element={< MyAccountDashboardLayout UserData={UserData} Logout={Logout}/>}>
            <Route path='' element={<MyAccount  UserData={UserData} OnUpdateName={OnUpdateName}/>} />
            <Route path='bookings' element={<MyBookings/>}/>
            <Route path='vehicles' element={<Vehicle/>}/>
        </Route>
        <Route exact path='bookingconfirmation' element={<BookingConfirmationPage />} />
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
