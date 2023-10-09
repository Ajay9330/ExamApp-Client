import React from 'react';
import logo from './Home.svg';
import './header.css'; // Import the CSS file

export default function Header({ onLogout }) {
  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <div className='mainnav'> {/* Apply the class */}
      <img src={logo} style={{ width: '35px', fill: '#00aaff', borderRadius: '36px' }} alt="" />
      <h2>Welcome to the ExamApp!</h2>
      <button className='buttonStyles' onClick={handleLogoutClick}>Logout</button> {/* Apply the class */}
    </div>
  );
}
