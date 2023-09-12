import React, { useState, useEffect } from 'react';
import TeachDash from './TeachStDash';
import Loading from '../Loading';
// import StDash from './StDash';

export default function Dash() {
  const [profile, setProfile] = useState({});
  const [isloading,setloading]=useState(true);
  const[error,seterror]=useState('');
  useEffect(() => {
    // Make the API call to fetch teacher data
    fetch('http://localhost:3300/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the contents of the data received from the API
        if (data && data.teacherData) {
          setProfile(data.teacherData);
        }else if(data && data.studentData){
          setProfile(data.studentData);
        }
        else {
          seterror(data.error);
          console.error('Invalid data received:', data);
          
        }
        setloading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        seterror(error);
        setloading(false);
      }
      )
      
  }, []);

  console.log(profile);

  // Check if profile is empty or undefined


  return (
    <>{error!=='' && <div>{error}</div>}
    {isloading && <Loading/>} 
      {profile.userType === 'student' ? (
        <TeachDash props={profile} />
      ) : profile.userType === 'teacher' ? (
        <TeachDash props={profile} />
      ) : (<p></p>
        
      )}
    </>
  );
}
