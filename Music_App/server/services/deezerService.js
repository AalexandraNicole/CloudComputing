import axios from "axios";

export const searchDeezer = async (query) => {
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  return response.data;
};
