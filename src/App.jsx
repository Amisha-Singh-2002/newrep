import React,{ useState } from 'react'
import './App.css'
import Navbar from './Navbar';
import Ask from './Ask';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Landing/Home';
function App() {
  const [user,setuser] = useState(null);
  function setu(id)
  {
    setuser(id)
  }
  return (
    <>
      <Navbar  />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Ask />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
