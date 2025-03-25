import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./components/login/login.jsx";
import Home from "./components/home/home.jsx"
import Disciplinas from "./components/disciplinas/disciplinas.jsx";
import Cursos from "./components/cursos/cursos.jsx";
import Turmas from "./components/turmas/turmas.jsx";
import Ambiente from "./components/ambiente/ambiente.jsx";


const App = ()=>{
  return(
  <Router>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/disciplinas" element={<Disciplinas />}/>
      <Route path="/cursos" element={<Cursos />}/>
      <Route path="/turmas" element={<Turmas />}/>
      <Route path="/ambientes" element={<Ambiente />}/>
    </Routes>
  </Router>
  )
}

export default App