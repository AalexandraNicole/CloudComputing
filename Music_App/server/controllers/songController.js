import { 
  fetchAllScores, 
  fetchScoreById, 
  createScore, 
  updateScore, 
  deleteScore 
} from "../services/musicApiService.js";

// Get all scores
export const getScores = async (req, res) => {
  try {
    const scores = await fetchAllScores();
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch scores from API_music" });
  }
};

// Get a single score by ID
export const getScore = async (req, res) => {
  try {
    const score = await fetchScoreById(req.params.id);
    if (!score) return res.status(404).json({ error: "Score not found" });
    res.status(200).json(score);
  } catch (err) {
    res.status(500).json({ error: "Error fetching score from API_music" });
  }
};

// Add a new score
export const addScore = async (req, res) => {
  try {
    const newScore = await createScore(req.body);
    res.status(201).json(newScore);
  } catch (err) {
    res.status(500).json({ error: "Failed to add score to API_music" });
  }
};

// Update an existing score
export const updateScores = async (req, res) => {
  try {
    const updatedScore = await updateScore(req.params.id, req.body);
    res.status(200).json(updatedScore);
  } catch (err) {
    res.status(500).json({ error: "Failed to update score in API_music" });
  }
};

// Delete a score
export const deleteScores = async (req, res) => {
  try {
    const result = await deleteScore(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete score in API_music" });
  }
};
