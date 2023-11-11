import React from 'react';
// import logo from './Home.svg';
import './header.css'; // Import the CSS file
import l2 from './toplogoeximo.png'
// import l from './eximo.png';
// import { Link } from 'react-router-dom';

export default function Header({ onLogout }) {
  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <div className='mainnav'> {/* Apply the class */}
<a href='/'>
  <span id='home' className="material-icons">
    home
  </span>
</a>
    
      <img src={l2} style={{ height: '38px',
        }} alt="" />
      {/* <h2>Welcome to the ExamApp!</h2> */}
      <button className='buttonStyles' onClick={handleLogoutClick}>Logout</button> {/* Apply the class */}
    </div>
  );
}
