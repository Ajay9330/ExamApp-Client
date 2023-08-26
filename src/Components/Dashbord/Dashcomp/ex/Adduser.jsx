import React, { useState } from 'react';
import './adduser.css'; // Import your CSS file for styling
import Loading from '../../../Loading';
import Message from '../../../Message';


function AddUser() {
  const [userDetails, setUserDetails] = useState({
    userType: 'teacher', // Default to 'teacher'
    email: '',
    password: '',
    experience: '',
    subjects: '',
    degrees: '',
    studentId: '',
    class: '',
    seatNo: '',
    addedBy: '',
    joinedDate: '',
    prnNo: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({});

  const handleChange = (field, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:3300/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'User added successfully' });
        setUserDetails({
          userType: 'teacher',
          email: '',
          password: '',
          experience: '',
          subjects: '',
          degrees: '',
          studentId: '',
          class: '',
          seatNo: '',
          addedBy: '',
          joinedDate: '',
          prnNo: '',
        });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage({ type: 'error', text: 'An error occurred while adding user' });
    } finally {
      setIsLoading(false);
    }
  };

  return (<>
    <div className="add-user-container">
      <h2>Add User</h2>
      <div>
        <label>User Type:</label>
        <select value={userDetails.userType} onChange={(e) => handleChange('userType', e.target.value)}>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={userDetails.email} onChange={(e) => handleChange('email', e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={userDetails.password} onChange={(e) => handleChange('password', e.target.value)} />
      </div>

      {userDetails.userType === 'teacher' && (
        <>
          <div>
            <label>Experience:</label>
            <input type="text" value={userDetails.experience} onChange={(e) => handleChange('experience', e.target.value)} />
          </div>
          <div>
            <label>Subjects:</label>
            <input type="text" value={userDetails.subjects} onChange={(e) => handleChange('subjects', e.target.value)} />
          </div>
          <div>
            <label>Degrees:</label>
            <input type="text" value={userDetails.degrees} onChange={(e) => handleChange('degrees', e.target.value)} />
          </div>
        </>
      )}

{userDetails.userType === 'student' && (
  <>
    <div>
      <label>Student ID:</label>
      <input
        type="text"
        value={userDetails.studentId}
        onChange={(e) => handleChange('studentId', e.target.value)}
      />
    </div>
    <div>
      <label>Class:</label>
      <input
        type="text"
        value={userDetails.class}
        onChange={(e) => handleChange('class', e.target.value)}
      />
    </div>
    <div>
      <label>Seat No:</label>
      <input
        type="text"
        value={userDetails.seatNo}
        onChange={(e) => handleChange('seatNo', e.target.value)}
      />
    </div>
    <div>
      <label>Added By:</label>
      <input
        type="text"
        value={userDetails.addedBy}
        onChange={(e) => handleChange('addedBy', e.target.value)}
      />
    </div>
    <div>
      <label>Joined Date:</label>
      <input
        type="date"
        value={userDetails.joinedDate}
        onChange={(e) => handleChange('joinedDate', e.target.value)}
      />
    </div>
    <div>
      <label>PRN No:</label>
      <input
        type="text"
        value={userDetails.prnNo}
        onChange={(e) => handleChange('prnNo', e.target.value)}
      />
    </div>
  </>
)}


      <div >
        <button onClick={handleSubmit} disabled={isLoading}>
          Add User
        </button>
      </div>
      {message && <p className={message.type}>{message.text}</p>}

    </div>
    {message.text !=null && <Message message={message.text} onClose={()=>{setMessage("")}}/>}
    </>
  );
}

export default AddUser;
