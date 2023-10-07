import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultCard from './ResultCard';
import './result.css';
import Loading from '../../../Loading';

import * as XLSX from 'xlsx'; 


function Result({props}) {

  const { examId } = useParams();
  const [examResult, setExamResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const downloadResultsAsExcel = () => {
    if (examResult) {
 
      const formattedData = examResult.map((result) => {
        const questionDetails = result.answers.map((answer, index) => {
          const questionText = answer.questiontext;
          const options = answer.options.join(', ');
          return `${index + 1}. ${questionText}: ${options}`;
        });
  
        return {
          'Exam Title': result.examTitle,
          'Student Seat No': result.studentSeat,
          'Student Name': result.studentName || 'N/A',
          
          'Submitted At': result.submittedAt || 'N/A', 
          'Score': result.score,
          
          'Questions and Options': questionDetails.join('\n'), 
          'Selected Options': result.answers.map((answer) => answer.selectedOptionIndex + 1).join('\n'),

        };
      });
  
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
  
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Exam Results');

      XLSX.writeFile(workbook, 'exam_results.xlsx');
    }
  };
  
  


  useEffect(() => {
    const fetchExamResult = async () => {
      try {

          const response = examId?await fetch(process.env.REACT_APP_apiurl+`/exam-results/${examId}`,{credentials:'include'}): await fetch(process.env.REACT_APP_apiurl+`/exam-results/${props._id}`,{credentials:'include'});
        

        if (!response.ok) {
          throw new Error('Failed to fetch exam result');
        }

        const data = await response.json();
       // console.log(data);
        setExamResult(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exam result:', error);
        setIsLoading(false);
      }
    };
  
    fetchExamResult();
  }, [examId,props]);
  

  return (
    <div className='examresult'>
      {isLoading && <Loading/>}
      <h3>   ({examId?examId:props._id})      <button id='dwnbtn' onClick={downloadResultsAsExcel}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg> </button></h3>

      {isLoading ? (
        <p>Loading...</p>
      ) : examResult ? (
        <>


          {examResult.map((e) => (
            <ResultCard key={e.studentId} result={e}/>
          ))}
        </>
      ) : (
        <p>Exam result not found.</p>
      )}
    </div>
  );
  
}

export default Result;
