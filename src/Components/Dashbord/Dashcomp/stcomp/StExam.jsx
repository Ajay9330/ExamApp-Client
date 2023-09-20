import React, { useState, useEffect } from 'react';
import StExCard from './StExCard';

function StExam() {
  const [allExams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_apiurl+'/exams', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setExams(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='stexamsec'>
        <h3>Today's Exams</h3>
        {allExams.today && allExams.today.length > 0 ? (
          <StExCard exams={allExams.today} />
        ) : (
          <p>No exams today</p>
        )}
      </div>
      <div className='stexamsec'>
        <h3>Upcoming Exams</h3>
        {allExams.upcoming && allExams.upcoming.length > 0 ? (
          <StExCard exams={allExams.upcoming} />
        ) : (
          <p>No upcoming exams</p>
        )}
      </div>
      <div className='stexamsec'>
        <h3>Past Exams</h3>
        {allExams.past && allExams.past.length > 0 ? (
          <StExCard exams={allExams.past} />
        ) : (
          <p>No upcoming exams</p>
        )}
      </div>
    </div>
  );
}

export default StExam;
