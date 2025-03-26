// pages/EditSongPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SongForm from '../components/SongForm';
import { getSongById, updateSong } from '../services/api';
import './css/EditSongPage.css';
//import Navbar from '../components/Navbar';

const EditSongPage = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const response = await getSongById(id);
      setSong(response.data);
    };
    fetchSong();
  }, [id]);

  const handleUpdateSong = async (updatedSong) => {
    await updateSong(id, updatedSong);
    history('/');
  };

  if (!song) return <p>Loading...</p>;

  return (
    <div className="edit-song-page">
      <h1>Edit Song</h1>
      <div className="song-form-container">
        <h2>Update Song Details</h2>
        <SongForm song={song} onSubmit={handleUpdateSong} />
      </div>
    </div>
  );
};

export default EditSongPage;
