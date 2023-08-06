import './App.css';
import { useState } from 'react';
import Home from './Components/Landing/Home';
import Login from './Components/Login';
import Loading from './Components/Loading';

function App() {
  const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const [loggedInUser, setLoggedInUser] = useState(storedUser || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  const handleLogin = async (userData) => {
    try {
      setLoading(true);
      setError(null); // Clear previous error if any

      const response = await fetch('examapp.api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setLoggedInUser(userData);
        sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
      } else {

        setError(JSON.stringify(response.statusText+":"+response.status));
        console.log(response); // Set error message
        sessionStorage.setItem('loggedInUser',"true");
        alert(JSON.stringify(sessionStorage));
      }
    } catch (error) {
      setError('An error occurred while connecting to the server.'); // Set error message
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); 

    }
  };

  return (
    <div className='App'>
      {loading ? (
        <Loading />
      ) : (
        // Show either Login or Home based on loggedInUser
        loggedInUser === null ? (
          <Login onLogin={handleLogin} error={error} />
        ) : (
          <Home />
        )
      )}
    </div>
  );
}

export default App;
