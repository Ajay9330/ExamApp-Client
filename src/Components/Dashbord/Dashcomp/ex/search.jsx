import React, { useState } from 'react';

function SearchUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      // Replace this with your actual API request
      const response = await fetch(`http://localhost:3300/search-user?userType=teacher&query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.users);

      setIsLoading(false);
    } catch (error) {
      console.error('Error searching users:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Users</h2>
      <div>
        <input
          type="text"
          placeholder="Enter a name or keyword"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch} disabled={isLoading}>
          Search
        </button>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {searchResults.length === 0 && !isLoading && <p>No results found.</p>}
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
