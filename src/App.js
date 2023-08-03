import React from 'react';
import Login from './components/Authentication/Login';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProfileComplete from './components/NavBar/ProfileCompelete/ProfileComplete';
import ProfileComplete from './components/ProfileCompelete/ProfileComplete';


function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/ProfileComplete' element={<ProfileComplete />} />
      </Routes>

    </Router>
  );
}

export default App;
