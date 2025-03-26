// pages/HomePage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSongs, deleteSong } from '../services/api';
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

  const handleDelete = async (id) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this song?");

  if (isConfirmed) {
    await deleteSong(id);
    setSongs(songs.filter((song) => song.id !== id));
  }
};

  const handleEdit = (id) => {
    console.log(`Edit song with ID: ${id}`);
    
    navigate(`/edit-song/${id}`);
  };

  return (
    <div>
      <h1>Song List</h1>
      <div className="song-list">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
