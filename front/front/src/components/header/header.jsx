import React from 'react';
import './header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">PBE</div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/about">Sobre</a>
        <a href="/contact">Contato</a>
      </nav>
    </header>
  );
};

export default Header;
