import express from "express";
import { getScores, getScore, addScore, updateScores, deleteScores } from "../controllers/songController.js";
const router = express.Router();

// Routes for handling scores
router.get("/", getScores);
router.get("/:id", getScore);
router.post("/", addScore);
router.put("/:id", updateScores);
router.delete("/:id", deleteScores);


// router.get('/songs', async (req, res) => {
//   try {
//     console.log("Testing API_music connection...");
//     const response = await axios.get('http://localhost:5000/api/scores');
//     console.log("Received data from API_music:", response.data);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Failed to fetch data from API_music:", error.message);
//     res.status(500).json({ error: "Failed to fetch data from API_music" });
//   }
// });

export default router;
