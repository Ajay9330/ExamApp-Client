import React, { useState, useEffect } from 'react';

const Waiting = ({ startTime }) => {
  const [message, setMessage] = useState('');
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();

      if (now < startTime) {
        const remainingMillis = startTime - now;

        const days = Math.floor(remainingMillis / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingMillis / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingMillis / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingMillis / 1000) % 60);

        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setMessage('Exam Not Started Yet');
      } else {
        setMessage(now > startTime ? 'Exam Started' : 'Exam Submitted');
        setRemainingTime('');
      }

      if (now > startTime) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  const waitingStyles = `
    .waiting-container {
  
      text-align: center;
      padding: 20px;
      background-color: #f0f0f0;
      border-radius: 10px;
      margin: 20px;
    }
    
    .waiting-container h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .waiting-container p {
        color:blue;
      font-size: 30px;
    }
  `;
    if(Date.now() > startTime){
        return;
    }
  return (<>
    <div style={{ display: 'flex', width: '100%', boxSizing: 'border-box',height:'calc(100vh - 60px)', alignItems:'center',justifyContent:'center'}}>
      <style>{waitingStyles}</style>
      <div className="waiting-container">
        <h2>{message}</h2>
        {remainingTime && <p>Remaining Time: {remainingTime}</p>}
      </div>
    </div></>
  );
};

export default Waiting;
