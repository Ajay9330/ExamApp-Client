import React, { useState, useEffect } from 'react';
import TeachDash from './TeachDash';
import StDash from './StDash';

export default function Dash() {
  const [profile, setProfile] = useState({});

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
          console.error('Invalid data received:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching teacher data:', error);
      });
  }, []);

  console.log(profile);

  // Check if profile is empty or undefined
  if (!profile || Object.keys(profile).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {profile.userType === 'student' ? (
        <TeachDash props={profile} />
      ) : profile.userType === 'teacher' ? (
        <TeachDash props={profile} />
      ) : (
        <p>User not found</p>
      )}
    </>
  );
}
