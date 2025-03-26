// components/SongCard.js

import React from 'react';
import './css/SongCard.css';


const SongCard = ({ song, onClick }) => {

  return (
    <div className="song-card" onClick={() => onClick(song.id)}>
      <h3>{song.title}</h3>
      <p><strong>Composer:</strong> {song.composer}</p>
    </div>
  );
};

export default SongCard;
