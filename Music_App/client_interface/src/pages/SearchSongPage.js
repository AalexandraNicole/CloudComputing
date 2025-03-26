import React, { useState } from 'react';
import axios from 'axios';
import './css/SearchSongPage.css'; // Import the CSS file

const SearchSongPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  // Handle form submission or input change
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to your backend server
      const response = await axios.get(`http://localhost:3001/api/${query}`);
      setSearchResults(response.data); // Store the search results in the state
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Failed to fetch songs");
      console.error("Error fetching from Deezer API:", error);
    }
  };

  return (
    <div className="search-song-page">
      <h1>Search for Songs</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song or artist"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      <div>
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.data.map((song, index) => (
              <li key={index}>{song.title} by {song.artist.name}</li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchSongPage;
