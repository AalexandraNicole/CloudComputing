// src/pages/NotFoundPage.js
import React from "react";
import './css/NotFoundPage.css';
import logoNF from './css/logoNF.svg';


const NotFoundPage = () => {
  return (
    <div>
      <img src={logoNF} className="NotFound" alt="logo" />
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFoundPage;
