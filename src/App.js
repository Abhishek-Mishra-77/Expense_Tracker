import React from 'react';
import Login from './components/Authentication/Login';
import ExepenseMain from './components/Expenses/ExepenseMain';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileComplete from './components/ProfileCompelete/ProfileComplete';
import ForgetPassword from './components/Authentication/ForgetPassword';
import PrivateRouts from './components/PrivateRoutes/PrivateRouts';
import About from './components/About/About';
import Profile from './components/Profile/Profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Auth' element={<Login />} />
        <Route path='/password' element={<ForgetPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/user' element={<PrivateRouts />}>
          <Route path='expense' element={<ExepenseMain />} />
          <Route path='ProfileComplete' element={<ProfileComplete />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<About />} />
      </Routes>

    </Router>
  );
}

export default App;
