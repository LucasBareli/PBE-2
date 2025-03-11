import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/login/login.jsx";
import Home from "./components/home/home.jsx"
import Disciplinas from "./components/disciplinas/disciplinas.jsx";


const App = ()=>{
  return(
  <Router>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/disciplinas" element={<Disciplinas />}/>
    </Routes>
  </Router>
  )
}

export default App