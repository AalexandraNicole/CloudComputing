// pages/AddSongPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SongForm from '../components/SongForm';
import { addSong } from '../services/api';
import './css/AddSongPage.css';
//import Navbar from '../components/Navbar';

const AddSongPage = () => {
  const history = useNavigate();

  const handleAddSong = async (newSong) => {
    await addSong(newSong);
    history('/');
  };

  return (
    <div>
      <h1>Add New Song</h1>
      <SongForm onSubmit={handleAddSong} />
    </div>
  );
};

export default AddSongPage;
