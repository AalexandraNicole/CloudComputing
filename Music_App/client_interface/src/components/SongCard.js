// components/SongCard.js

import React from 'react';
import './css/SongCard.css';
import { useNavigate } from 'react-router-dom';


const SongCard = ({ song, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/play-song/${song.id}`);
  };

  return (
    <div className="song-card">
      <h3>{song.title}</h3>
      <p><strong>Composer:</strong> {song.composer}</p>
      <button onClick={() => onEdit(song.id)}>Edit</button>
      <button onClick={() => onDelete(song.id)}>Delete</button>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default SongCard;
