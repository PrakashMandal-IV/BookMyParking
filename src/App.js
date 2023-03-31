
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Navbar';

import Home from './Pages/Home';
import Login from './Pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/' element={<Nav />}>
        <Route path='home' element={<Home />} />
        <Route path='homeee' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
