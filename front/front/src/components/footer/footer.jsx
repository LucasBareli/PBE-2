import React from 'react';
import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/privacy-policy">Política de Privacidade</a>
        <a href="/terms-of-service">Termos de Serviço</a>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} MyWebsite. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
