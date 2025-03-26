// pages/PlaySongPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSongById } from '../services/api';
import './css/PlaySongPage.css';
import * as Tone from 'tone';

const PlaySongPage = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [tempo, setTempo] = useState(120); // 👈 separate state for editable tempo
  const [currentNote, setCurrentNote] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      const res = await getSongById(id);
      setSong(res.data);
      setTempo(res.data.tempo || 120); // 👈 initialize editable tempo
    };
    fetchSong();
  }, [id]);

  const playNotes = async () => {
    if (!song) return;

    await Tone.start();
    setIsPlaying(true);

    const synth = new Tone.Synth().toDestination();
    const notes = song.notes.split(' ');
    const noteDuration = (60 / tempo) * 1000; // 👈 use editable tempo

    let index = 0;

    const playNext = () => {
      if (index < notes.length) {
        const note = notes[index];
        setCurrentNote(note);
        synth.triggerAttackRelease(note, '8n');
        index++;
        setTimeout(playNext, noteDuration);
      } else {
        setIsPlaying(false);
        setCurrentNote(null);
      }
    };

    playNext();
  };

  if (!song) return <div>Loading...</div>;

  return (
    <div className="play-song-page">
    <h2>{song.title} - {song.composer}</h2>
    <p><strong>Notes:</strong> {song.notes}</p>

    <div className="tempo-control">
      <label htmlFor="tempo">🎚 Tempo:</label>
      <input
        id="tempo"
        type="range"
        min="60"
        max="200"
        value={tempo}
        onChange={(e) => setTempo(Number(e.target.value))}
      />
      <span>{tempo} BPM</span>
    </div>

    <button className="play-button" onClick={playNotes} disabled={isPlaying}>
      {isPlaying ? 'Playing...' : 'Play'}
    </button>

    {currentNote && <h3 className="current-note">🎶 Playing: {currentNote}</h3>}
  </div>
  );
};

export default PlaySongPage;
