// components/SongForm.js

import React, { useState, useEffect } from 'react';
import './css/SongForm.css';

const SongForm = ({ onSubmit, song }) => {
  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');
  const [notes, setNotes] = useState('');
  const [tempo, setTempo] = useState(120);

  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setComposer(song.composer);
      setNotes(song.notes);
      setTempo(song.tempo);
    }
  }, [song]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSong = { title, composer, notes, tempo };
    onSubmit(newSong);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Composer:
        <input
          type="text"
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
          required
        />
      </label>
      <label>
        Notes:
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />
      </label>
      <label>
        Tempo:
        <input
          type="number"
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SongForm;
