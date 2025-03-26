import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSongById, deleteSong } from '../services/api';
import './css/PlaySongPage.css';
import * as Tone from 'tone';

const PlaySongPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [tempo, setTempo] = useState(120); 
  const [currentNote, setCurrentNote] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);
  const [sequence, setSequence] = useState(null);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this song?");
    if (isConfirmed) {
      await deleteSong(song.id);
      navigate('/'); 
    }
  };
  
  const handleEdit = () => {
    console.log(`Edit song with ID: ${song.id}`);
    navigate(`/edit-song/${song.id}`);
  };

  useEffect(() => {
    const fetchSong = async () => {
      const res = await getSongById(id);
      setSong(res.data);
      setTempo(res.data.tempo || 120); 
    };
    fetchSong();
  }, [id]);

  const playNotes = async () => {
    if (!song) return;

    await Tone.start();
    setIsPlaying(true);

    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    const notes = song.notes.split(' ');
    const noteDuration = (60 / tempo); 

    const noteSequence = new Tone.Sequence(
      (time, note) => {
        setCurrentNote(note);
        newSynth.triggerAttackRelease(note, "8n", time); 
      },
      notes,
      noteDuration
    );

    Tone.Transport.bpm.value = tempo;

    Tone.Transport.start();
    noteSequence.start(0); 

    setSequence(noteSequence);
  };

  // Stop the notes
  const stopNotes = () => {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop(); 
      setIsPlaying(false);
      setCurrentNote(null);
    }
  };

  // Return loading screen if song is not yet loaded
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

      {!isPlaying && (
        <button className="play-button" onClick={handleEdit}>
            Edit
        </button>
      )}
      <button className="play-button" onClick={playNotes} disabled={isPlaying}>
      {isPlaying ? 'Playing...' : 'Play'}
      </button>
      {!isPlaying && (
      <button className="play-button" onClick={handleDelete}>
            Delete
      </button> 
      )}
      {isPlaying && (
        <button
        className="play-button"
        onClick={stopNotes}
        >
          Stop
        </button>
      )}

      {currentNote && <h3 className="current-note">🎶 Playing: {currentNote}</h3>}
    </div>
  );
};

export default PlaySongPage;
