import React from 'react';
import Login from './components/Authentication/Login';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileComplete from './components/ProfileCompelete/ProfileComplete';
import ForgetPassword from './components/Authentication/ForgetPassword';
import PrivateRouts from './components/PrivateRoutes/PrivateRouts';
import Home from './components/Home/Home';


function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/Auth' element={<Login />} />
        <Route path='/password' element={<ForgetPassword />} />
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<PrivateRouts />}>
          <Route path='profile' element={<Profile />} />
          <Route path='ProfileComplete' element={<ProfileComplete />} />
        </Route>
        <Route path='*' element={<Home />} />
      </Routes>

    </Router>
  );
}

export default App;
