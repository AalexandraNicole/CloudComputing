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
    if (!query.trim()) {
        setError("Please enter a valid search term.");
        return;
    }
    try {
      // Make the API request to your backend server
      console.log('Search for: ', query );
      const response = await axios.get(`http://localhost:3001/api/${query}`);
      console.log('Search results:', response.data);  // Log the results to verify the data
      setSearchResults(response.data.data); // Set the search results
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
            {searchResults.map((song, index) => (
              <li key={song.id}>
                <div className="song-item">
                  <img 
                    src={song.album.cover_medium} 
                    alt={song.title} 
                    className="album-cover"
                  />
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist.name}</p>
                    <a href={song.link} target="_blank" rel="noopener noreferrer">
                      Listen Now
                    </a>
                  </div>
                </div>
              </li>
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
