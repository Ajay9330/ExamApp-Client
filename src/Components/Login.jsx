import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default userType
  const error="none";

  const navigate = useNavigate(); // Declare the navigate function here

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      userType,
    };

    try {
      const response = await fetch('http://localhost:3300/login', {
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
        navigate('/'); // Use navigate here to navigate to the root route
      } else {
        console.error('Login failed:', response.status, response.statusText);
        // Handle login error here if needed
      }
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="input-field"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
