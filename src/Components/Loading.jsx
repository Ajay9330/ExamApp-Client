import React from 'react';
import './Loading.css';
import l from './Landing/eximo.png'
const Loading = () => {
  return (
    <div className='loading-container'>
      <img src={l} alt="logo" width={186} />
      <p id='wait-text'>Please wait... <span className="material-icons loading-icon">
autorenew
</span></p>
      <div className='loading-spinner'></div>
    </div>
  );
};

export default Loading;
