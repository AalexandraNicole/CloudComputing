import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import musicApiRoutes from './routes/musicApiRoutes.js';
import deezerSearch from "./routes/search.js";
//import songRoutes from "./routes/songs.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/songs", musicApiRoutes);
app.use("/api", deezerSearch);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
