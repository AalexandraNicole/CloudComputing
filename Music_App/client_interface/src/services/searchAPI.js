import axios from 'axios';

const SEARCH_URL = 'http://localhost:3001/api';

export const searchSongs = async (query) => {
  try {
      console.log('Search for: ', query );
      const response = await axios.get(`${SEARCH_URL}/${query}`);
      console.log('Search results:', response.data);  
      return response; 
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
};