// pages/HomePage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSongs } from '../services/api';
import SongCard from '../components/SongCard';
import './css/HomePage.css';
//import Navbar from '../components/Navbar';


const HomePage = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await getSongs();
      setSongs(response.data);
    };
    fetchSongs();
  }, []);

  const handlePlay = (id) => {
    navigate(`/play-song/${id}`);
  };

  return (
    <div>
      <h1>Song List</h1>
      <div className="song-list">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} 
            onClick={handlePlay}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
