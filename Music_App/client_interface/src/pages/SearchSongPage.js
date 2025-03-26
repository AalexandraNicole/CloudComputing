import React, { useState } from 'react';
import { searchSongs } from '../services/searchAPI';
import './css/SearchSongPage.css'; 

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
      console.log('Search for: ', query );
      const response = await searchSongs(query);
      console.log('Search results:', response.data);  
      setSearchResults(response.data.data); 
      setError(null); 
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
                    <a href={song.link} target="_blank" rel="noopener noreferrer">
                      <h3>{song.title}</h3>
                      <p>{song.artist.name}</p>
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
