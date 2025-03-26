// services/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/songs';

// Get all songs
export const getSongs = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response;
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};

// Get a single song by ID
export const getSongById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching song with ID ${id}:`, error);
  }
};

// Add a new song
export const addSong = async (newSong) => {
  try {
    const response = await axios.post(BASE_URL, newSong);
    return response;
  } catch (error) {
    console.error("Error adding song:", error);
  }
};

// Update an existing song
export const updateSong = async (id, updatedSong) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedSong);
    return response;
  } catch (error) {
    console.error(`Error updating song with ID ${id}:`, error);
  }
};

// Delete a song
export const deleteSong = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting song with ID ${id}:`, error);
  }
};
