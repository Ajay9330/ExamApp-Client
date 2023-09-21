// UserCard.js
import React, { useState } from 'react';
import ConfirmDialog from '../../../conloadcomp/ConfirmDialog';


function UserCard({ user, onDeleteClick }) {
  const [showconfirm,setconfirm]=useState(false);
  function deleteusr(){
    onDeleteClick(user._id,user.userType);
  }





  return (<>
      {showconfirm && <ConfirmDialog message={"Do you want to delete user" } onConfirm={()=>{setconfirm(false);deleteusr()}}   onCancel={()=>{setconfirm(false);}}/>}
 
      <div className="user-card">
      <div>
      <button onClick={()=>{setconfirm(true);}} class="idelete-button"><span class="idelete-icon">x </span></button>
      </div>
      <p className="user-card-email">Email: {user.email}

      <div className='addimg searchimg'>
          <img src={user.imageUrl} alt='img'/>
        </div>

        </p>
   
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
    </>
  );
}

export default UserCard;
