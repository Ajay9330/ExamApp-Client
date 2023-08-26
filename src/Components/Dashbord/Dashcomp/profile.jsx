import React from 'react';
import './profile.css';

function Profile({ props }) {
  return (
    <div className={`profile-container ${props.userType}`}>
      <h2>Welcome, {props.userType === 'student' ? 'Student' : 'Teacher'}!</h2>
      <div className="profile-info">
        <div className="user-details">
          <p><strong>Name:</strong> {props.email}</p>
          {props.userType === 'student' ? (
            <>
              <p><strong>PRN Number:</strong> {props.password}</p>
              {/* Add more student-specific information */}
            </>
          ) : props.userType === 'teacher' ? (
            <>
              <p><strong>Subject:</strong> {props.subject}</p>
              <p><strong>Teaching Experience:</strong> {props.teachingExperience}</p>
              {/* Add more teacher-specific information */}
            </>
          ) : (
            <p className="unknown">Unknown user type</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
