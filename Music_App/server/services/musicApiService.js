import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

// This is the URL of your local API_music server
const MUSIC_API_URL = process.env.MUSIC_API_URL;

// Fetch all scores
export const fetchAllScores = async () => {
    try {
    console.log("Fetching all scores...");
    const res = await axios.get(`${MUSIC_API_URL}/api/scores`);
    console.log("Scores fetched successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching scores:", err.message);
    throw new Error("Failed to fetch scores from API_music");
  }
};

// Fetch a score by ID
export const fetchScoreById = async (id) => {
  try {
    const res = await axios.get(`${MUSIC_API_URL}/api/scores/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching score with ID ${id}:`, err.message);
    throw new Error("Failed to fetch score from API_music");
  }
};

// Create a new score
export const createScore = async (scoreData) => {
  const res = await axios.post(`${MUSIC_API_URL}/api/scores`, scoreData);
  return res.data;
};

// Update an existing score
export const updateScore = async (id, scoreData) => {
  const res = await axios.put(`${MUSIC_API_URL}/api/scores/${id}`, scoreData);
  return res.data;
};

// Delete a score by ID
export const deleteScore = async (id) => {
  const res = await axios.delete(`${MUSIC_API_URL}/api/scores/${id}`);
  return res.data;
};
