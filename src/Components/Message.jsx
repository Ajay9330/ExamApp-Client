import React from 'react';
import './message.css';

const Message = ({ message, type, onClose }) => {
  return (
    <div className="message-overlay">
      <div className={`message ${type}`}>
        <p>{message}</p>
        <button className="ok-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Message;
