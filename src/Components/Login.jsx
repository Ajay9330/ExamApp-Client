import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Message from './Message';
import eximo from './Landing/eximo.png'
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

        setLoading(false);
 
    }
  };

  return (
    <>
    {loading?<Loading/>:""}
    <div className="login-container">
      <img src={eximo} width={200} alt='logo'/>
      <p>
          {/* <i className="material-icons">account_circle</i> */}

      </p>
      {error && !loading && <Message message={error} onClose={()=>{setError(null)}} />}
      <form onSubmit={handleSubmit}>
        <div>
        <i className="material-icons " id='email'>email</i>
        <input
          
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div>
        <i id='pass' className="material-icons">lock</i>
        <input
         
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
   
        <div>
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
        </div>


        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;
