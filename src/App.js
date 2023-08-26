import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Landing/Home';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Dash from './Components/Dashbord/Dash';
import Loading from './Components/Loading';
import CreateExam from './Components/exam/Createxam';
import Header from './Components/Landing/Header';
import Popup from './Components/Popup';
async function logout() {

  try {
    const response = await fetch('http://localhost:3300/logout', {
      method: 'post',
      credentials: 'include',
    });
    const responseData = await response.json();
    if (response.ok) {
      // clearAllCookies(); // Call your clearAllCookies function
      // alert("Successfully Logout");
      alert(JSON.stringify(responseData.message)); // Use 'message', not 'messege'
    } else {
      // Handle logout error if needed
      console.error('Logout failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while sending the request:', error);
  }
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
function App() {
  
  const [isloggedin, setLoggedin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:3300/verify', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        console.log(response.status);
        if (response.ok) {
          setLoggedin(true);
        } else if(response.status==404) {
          setLoggedin(false);
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      } finally {
        setTimeout(()=> setLoading(false),5);
      }
    };

    checkLoginStatus();
  }, []); // Empty dependency array to trigger the effect only once

  if (loading) {
    return <Loading />;
  }

  return (
    <>
   {/* {loading?<Loading/>:""} */}
    <div className='App'>

    {isloggedin && <Header onLogout={() => { setLoggedin(false); logout(); }} />}
      <Router>
        <Routes>
        
  
          <Route
            path='/dashboard' 
            element={isloggedin ? <Dash /> : <Navigate to="/login" />}
          />
           <Route
             path='/create-exam'
             element={isloggedin ? <CreateExam /> : <Navigate to='/login' />}
           />

          <Route
            path='/' exact
            // element={isloggedin ? <Home /> : <Navigate to="/login" />}
            element={isloggedin ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path='/login'
            element={isloggedin ? <Navigate to='/' /> : <Login setLogin={setLoggedin} />}
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
