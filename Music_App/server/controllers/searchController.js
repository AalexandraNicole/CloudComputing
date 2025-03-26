import { searchDeezer } from "../services/deezerService.js";

export const searchSongs = async (req, res) => {
  try {
    const query = req.params.query;
    console.log("The QUERY: ",query);
    const result = await searchDeezer(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("Deezer error:", error.message);
    res.status(500).json({ error: "Failed to fetch from Deezer" });
  }
};
