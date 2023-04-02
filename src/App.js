
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Navbar';

import Home from './Pages/Home';
import Login from './Pages/LoginPage';
import { useState } from 'react';

function App() {
  const nav = useNavigate()
  const [UserData,SetUserData] = useState(null)


  function OnLogin(UserData){
    SetUserData(UserData)
     nav('/home')
  }
  return (
    <Routes>
      <Route path='/' element={<Login OnLogin={(data)=>OnLogin(data)}/>}/>
      <Route path='/' element={<Nav UserData={UserData}/>}>
        <Route path='home' element={<Home />} />
        <Route path='homeee' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
