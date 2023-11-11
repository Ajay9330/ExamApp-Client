import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Dash from './Components/Dashbord/Dash';
import Loading from './Components/Loading';
import Header from './Components/Landing/Header';
import Result from './Components/Dashbord/Dashcomp/teachcomp/Result';
import ConfirmDialog from './Components/conloadcomp/ConfirmDialog';
import StudentExam from './Components/Dashbord/Dashcomp/stcomp/StudentExam';

async function logout() {
  try {
    const response = await fetch(`${process.env.REACT_APP_apiurl}/logout`, {
      method: 'post',
      credentials: 'include',
    });
    const responseData = await response.json();
    if (response.ok) {
      alert(JSON.stringify(responseData.message));
    } else {
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
  const [showconfirm, setConfirm] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_apiurl}/verify`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          setLoggedin(true);
        } else if (response.status === 401) {
          setLoggedin(false);
        }
      } catch (error) {
        console.error('An error occurred while sending the request:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to check login status
    checkLoginStatus();
  }, []); // Empty dependency array to trigger the effect only once

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    
      <div className='App'>
        {showconfirm && <ConfirmDialog message={"Do you want to logout?"} onCancel={() => setConfirm(false)} onConfirm={() => { setLoggedin(false); logout(); setConfirm(false) }} />}
        {isloggedin && <Header onLogout={() => setConfirm(true)} />}
        <Router>
          <Routes>
            <Route path='/' element={isloggedin ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path='/dashboard' element={isloggedin ? <Dash /> : <Navigate to="/login" />} />
            <Route path='/exam/startexam/:examId' element={isloggedin ? <StudentExam /> : <Navigate to='/login' />} />
            <Route path='/exam/result/:examId' element={isloggedin ? <Result /> : <Navigate to='/login' />} />
            <Route path='/login' element={isloggedin ? <Navigate to='/' /> : <Login setLogin={setLoggedin} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
