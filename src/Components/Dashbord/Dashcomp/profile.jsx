import React from 'react';
import './profile.css';

function Profile({ props }) {
  return (
    <div className={`profile-container ${props.userType}`}>
      <h2>Welcome, {props.userType === 'student' ? 'Student' : 'Teacher'}!</h2>
      <div className="profile-info">
        <div className="maindetail">
          <div className='addimg'>
            <img src={props.imageUrl} alt='img' />
          </div>
          <div>
            <span className="label">Name:</span>
            <span className="value">{props.name}</span>
          </div>
        </div>
        <div className="user-details">
          <div className="detail">
            <i className="material-icons icon-email">email</i>
            <span className="label">Email:</span>
            <span className="value">{props.email}</span>
          </div>

          <div className="detail">
            <i className="material-icons icon-age">today</i>
            <span className="label">Age:</span>
            <span className="value">{props.age}</span>
          </div>

          <div className="detail">
            <i className="material-icons icon-gender">wc</i>
            <span className="label">Gender:</span>
            <span className="value">{props.gender}</span>
          </div>

          {props.userType === 'student' ? (
            <>
              <div className="detail">
                <i className="material-icons icon-student-id">school</i>
                <span className="label">Student ID:</span>
                <span className="value">{props.studentId}</span>
              </div>
              <div className="detail">
                <i className="material-icons icon-class">class</i>
                <span className="label">Class:</span>
                <span className="value">{props.class}</span>
              </div>
              <div className="detail">
                <i className="material-icons icon-seat">event_seat</i>
                <span className="label">Seat No:</span>
                <span className="value">{props.seatNo}</span>
              </div>
              <div className="detail">
                <i className="material-icons icon-added-by">group</i>
                <span className="label">Added By:</span>
                <span className="value">{props.addedBy}</span>
              </div>
              <div className="detail">
                <i className="material-icons icon-joined-date">event</i>
                <span className="label">Joined Date:</span>
                <span className="value">{props.joinedDate}</span>
              </div>
              <div className="detail">
                <i className="material-icons icon-prn">confirmation_number</i>
                <span className="label">PRN Number:</span>
                <span className="value">{props.prnNo}</span>
              </div>
              {/* Add more student-specific information */}
            </>
          ) : props.userType === 'teacher' ? (
            <>
              <div className="detail">
                <i className="material-icons icon-experience">work</i>
                <span className="label">Experience:</span>
                <span className="value">{props.experience}</span>
              </div>
              <div className="detail">
                <i className="material-icons icon-subjects">subject</i>
                <span className="label">Subjects:</span>
                <span className="value">{props.subjects}</span>
              </div>
              <div className="detail">
                <i className="material-icons icon-degrees">school</i>
                <span className="label">Degrees:</span>
                <span className="value">{props.degrees}</span>
              </div>
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
