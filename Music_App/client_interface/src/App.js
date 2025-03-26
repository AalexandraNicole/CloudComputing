import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddSongPage from './pages/AddSongPage';
import EditSongPage from './pages/EditSongPage';
import SearchSongPage from './pages/SearchSongPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Navbar />
        </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-song" element={<AddSongPage />} />
            <Route path="/edit-song/:id" element={<EditSongPage />} />
            <Route path="/search-song" element={<SearchSongPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
