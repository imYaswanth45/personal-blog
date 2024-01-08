import React, { useContext, useEffect, useState } from 'react'
import Home from './pages/home/Home'
import Topbar from './components/topbar/Topbar'
import SinglePost from './components/singlepost/SinglePost'
import Sidebar from './components/sidebar/Sidebar'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Context } from './context/Context'

const App = () => {
  console.log("App");
  const {user} = useContext(Context);
  

  return (
    
    <div>
      <Router>
        <Topbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={user ? <Home />:<Register />} />
          <Route exact path="/login" element={user ? <Home />:<Login />} />
          <Route exact path="/Write" element={user ? <Write />:<Register />} />
          <Route exact path="/settings" element={user ? <Settings />:<Register />} />
          <Route exact path="/post/:postId" element={<Single />} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App