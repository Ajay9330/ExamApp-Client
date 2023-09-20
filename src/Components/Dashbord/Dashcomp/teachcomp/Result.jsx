import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultCard from './ResultCard';
import './result.css';
function Result({props}) {
  // Get the examId from the URL parameter
  const { examId } = useParams();
  const [examResult, setExamResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchExamResult = async () => {
      try {

          const response = examId?await fetch(process.env.REACT_APP_apiurl+`/exam-results/${examId}`,{credentials:'include'}): await fetch(process.env.REACT_APP_apiurl+`/exam-results/${props._id}`,{credentials:'include'});
        

        if (!response.ok) {
          throw new Error('Failed to fetch exam result');
        }

        const data = await response.json();
        console.log(data);
        setExamResult(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exam result:', error);
        setIsLoading(false);
      }
    };
  
    fetchExamResult();
  }, [examId]);
  

  return (
    <div className='examresult'>
   
      <h3>   ({examId?examId:props._id})</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : examResult ? (
        <>
          {examResult.map((e) => (
            <ResultCard result={e}/>
          ))}
        </>
      ) : (
        <p>Exam result not found.</p>
      )}
    </div>
  );
  
}

export default Result;
