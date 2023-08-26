import React from 'react';
import './ConfirmDialog.css'; // Import your CSS for styling

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog">
      <div className="confirm-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="button-container">
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
