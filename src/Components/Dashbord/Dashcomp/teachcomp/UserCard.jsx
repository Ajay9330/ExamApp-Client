// UserCard.js
import React from 'react';


function UserCard({ user }) {
  return (
    <div className="user-card">
      <p className="user-card-email">Email: {user.email}</p>
      {user.userType === 'student' && (
        <div className="student-info">
          <p>Student ID: {user.studentId}</p>
          <p>Class: {user.class}</p>
          <p>Seat No: {user.seatNo}</p>
          <p>Added By: {user.addedBy}</p>
          <p>Joined Date: {user.joinedDate}</p>
          <p>PRN No: {user.prnNo}</p>
        </div>
      )}
      {user.userType === 'teacher' && (
        <div className="teacher-info">
          <p>Experience: {user.experience}</p>
          <p>Subjects: {user.subjects}</p>
          <p>Degrees: {user.degrees}</p>
        </div>
      )}
    </div>
  );
}

export default UserCard;
