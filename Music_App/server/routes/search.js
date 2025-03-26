import express from "express";
import { searchSongs } from "../controllers/searchController.js";
const router = express.Router();

router.get("/:query", searchSongs);

export default router;
