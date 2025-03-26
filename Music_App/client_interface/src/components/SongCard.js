// components/SongCard.js

import React from 'react';
import './css/SongCard.css';

const SongCard = ({ song, onEdit, onDelete }) => {
  return (
    <div className="song-card">
      <h3>{song.title}</h3>
      <p><strong>Composer:</strong> {song.composer}</p>
      <button onClick={() => onEdit(song.id)}>Edit</button>
      <button onClick={() => onDelete(song.id)}>Delete</button>
    </div>
  );
};

export default SongCard;
