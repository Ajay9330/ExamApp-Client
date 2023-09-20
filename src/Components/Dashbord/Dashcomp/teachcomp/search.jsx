import React, { useState } from 'react';
import UserCard from './UserCard'; // Make sure you have the UserCard component
import './searchuser.css';
import Loading from '../../../Loading';
import Message from '../../../Message';

function SearchUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const response = await fetch(process.env.REACT_APP_apiurl+`/search-user?q=${encodedSearchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setSearchResult(data.results);
      } else {
        setSearchResult([]);
        console.log("hi")
        setError(data.error);
        console.log(data.error);
        console.log(error);
       
      }
    } catch (error) {
      console.error('Error searching user:', error);
      setSearchResult([]);
      setError('An error occurred while searching for users');
    } finally {
      setIsLoading(false);
    }
  };

 

  return (<>
    {isLoading&&<Loading/>}
    <h2 className='head'>Search User</h2>
    <div className="search-user-container">
    {error!=null &&<Message message={error} type="error" onClose={()=>{setError(null)}}/>}
    
      <div className="search-input">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
        />
        <button className='srchbtn' onClick={handleSearch} disabled={isLoading}>
          Search
        </button>
      </div>
      <div className="user-card-list">
        {searchResult.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
    </>
  );
}

export default SearchUser;
