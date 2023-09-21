import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Message from './Message';

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default userType
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Declare the navigate function here

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true while fetching

    const userData = {
      email,
      password,
      userType,
    };

    try {
      const response = await fetch(process.env.REACT_APP_apiurl+'/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      if (response.ok) {
        console.log(response.status);
        setLogin(true);
        // await onLogin(userData);
        navigate('/dashboard'); // Use navigate here to navigate to the root route
      } else if(response.status===401) {
        setError('Invalid email or password.'); // Set the error message
        console.error('Login failed:', response.status, response.statusText);
        // Handle login error here if needed
      }else{
        setError("error code"+response.status);
      }
    } catch (error) {
      setError('An error occurred while sending the request.');
      console.error('An error occurred while sending the request:', error);
    } finally {
      // Use setTimeout to delay setting loading back to false
     // console.log(process.env.REACT_APP_apiurl);
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 2000 milliseconds delay
    }
  };

  return (
    <>
    {loading?<Loading/>:""}
    <div className="login-container">
      <h1>Login</h1>
      {error && !loading && <Message message={error} onClose={()=>{setError(null)}} />}
      <form onSubmit={handleSubmit}>
        <input
          id='emai'
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id='pass'
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          id='type'
          title='select'
          className="input-field"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;
