import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Landing/Home';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Dash from './Components/Dashbord/Dash';

function clearAllCookies() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

function App() {
  const [isloggedin, setLoggedin] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state while checking login status

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:3300', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          setLoggedin(true);
        } else {
          setLoggedin(false);
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      } finally {
        setLoading(false); // Request completed, stop loading
      }
    };

    checkLoginStatus();
  }, []);

  // Show loading screen while checking login status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App'>
     {isloggedin? <button onClick={()=>{setLoggedin(false);clearAllCookies();  }}>click</button>:""}
      <Router>
        <Routes>
          <Route
            path='/dashboard'
            element={isloggedin ? <Dash /> : <Navigate to="/login" />}
          />
          <Route
            path='/'
            element={isloggedin ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path='/login'
            element={isloggedin ? <Navigate to='/' /> : <Login setLogin={setLoggedin} />}
          />
          {/* Add more protected routes here */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
