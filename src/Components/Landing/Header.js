import React from 'react';
import logo from './Eximo.png';
export default function Header({ onLogout }) {
  const headerStyles = {

    maxHeight:'35px',
    backgroundColor: '#3498db',
    // backgroundColor: '#020002',
    color: 'white',
    padding: '10px 20px 10px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyles = {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <div style={headerStyles}>
    <img src={logo} style={{ width: '35px', fill: '#00aaff',borderRadius: '36px' }} alt="" />

      <h2>Welcome to the ExamApp!</h2>
      <button style={buttonStyles} onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
