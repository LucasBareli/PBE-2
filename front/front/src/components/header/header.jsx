import React from 'react';
import './header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">PBE</div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/home">Professores</a>
        <a href="/disciplinas">Disciplinas</a>
        <a href="/cursos">Cursos</a>
      </nav>
    </header>
  );
};

export default Header;
