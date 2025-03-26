// components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add-song">Add Song</Link>
      <Link to="/search-song">Search</Link>
    </nav>
  );
};

export default Navbar;
