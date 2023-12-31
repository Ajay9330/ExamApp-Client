import React, { useState } from 'react';
import './adduser.css'; // Import your CSS file for styling
// import Loading from '../../../Loading';
import Message from '../../../Message';

async function readFileAsDataURLAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

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
    name:'',
    gender:'',
    age:Number,
    mainsubject:'',
    
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  
  const handleChange = (field, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    // e.preventDefault(); // Prevent default browser behavior
    const file = e.target.files[0];
    if (file) {
      try {
      // Check image size (approximate limit: 500KB)
      const maxSizeInBytes = 560000; // 520KB
      if (file.size > maxSizeInBytes) {
        alert('Image size exceeds the limit (approx. 500KB). Please choose a smaller image.');
        setImage(null);
        setImageUrl("");
        e.target.value = null; 
        return;
      }
        const dataUrl = await readFileAsDataURLAsync(file);
        // Extract base64 data
        const base64Data = dataUrl.split(',')[1];
        // Store base64Data in your database
        console.log('Base64 representation of the image:', base64Data);
        setImage(file);
        setImageUrl(dataUrl);
      } catch (error) {
        console.error('Error converting image to base64:', error.message);
      }
    } else {
      setImage(null);
      setImageUrl('');
      alert('No file selected.');
    }
  };
  

  const handleSubmit = async () => {
    try {
      if (!image) {
        alert('Please select an image.');
        return;
      }
  
      // Combine the image and userDetails in a JavaScript object
      const requestData = {
     userDetails,
     imageUrl, // Include the image data
      };

  
      // Stringify the JavaScript object to JSON
      const requestBody = JSON.stringify(requestData);
     // console.log(requestData);
  
      setIsLoading(true);
  
      const response = await fetch(process.env.REACT_APP_apiurl+'/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: requestBody,
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
          name:'',
          gender:'Male',
          age:Number,
          mainsubject:''
        });
        setImageUrl("");
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
     <div className='addimg'>  {imageUrl && <img  src={imageUrl}  alt="Preview" />}</div>
    <div className="add-user-container">
       
      <div>
        <label>User Type:</label>
        <select value={userDetails.userType} onChange={(e) => handleChange('userType', e.target.value)}>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      <div>
        <label>Name:</label>
        <input type="text" value={userDetails.name} onChange={(e) => handleChange('name', e.target.value)} />
      </div>

      <div>
  <label>Profile Image:</label>
  <input type="file" accept="image/*" onChange={handleImageUpload} />

</div>


      <div>
        <label>Email:</label>
        <input type="email" value={userDetails.email} onChange={(e) => handleChange('email', e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={userDetails.password} onChange={(e) => handleChange('password', e.target.value)} />
      </div>
    
      <div>
        <label>Age:</label>
        <input type="number" value={userDetails.age} onChange={(e) => handleChange('age', e.target.value)} />
      </div>

      <div>
        <label>Gender:</label>
        <select value={userDetails.gender} onChange={(e) => handleChange('gender', e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="other">Other</option>
        </select>
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
            <label>Main Subject:</label>
            <input type="text" value={userDetails.mainsubject} onChange={(e) => handleChange('mainsubject', e.target.value)} />
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
    {message.text !=null && <Message message={message.text} type={message.type} onClose={()=>{setMessage("")}}/>}
    </>
  );
}

export default AddUser;
