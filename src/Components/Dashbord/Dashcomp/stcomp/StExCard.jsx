import React from 'react';
import { useNavigate } from 'react-router-dom';

function StExCard({ exams }) {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleStartExam = (examId) => {
    // Use navigate to redirect to the exam start page with the examId parameter
    navigate(`/exam/startexam/${examId}`);
  };

  return (
    <div className="excardcont">
      {exams.map((exam) => (
        <div key={exam._id} className="exam-card">
          <h1 className="exam-title">
            {exam.title} <span>{exam.examCode}</span>
          </h1>
          <h2 className="exam-date">Start At: {formatDate(exam.date)}</h2>
          <p className="exam-duration">Duration: {exam.duration} minutes</p>
          <p className="exam-created-by">Created By: {exam.createdBy}</p>
          <p className="exam-created-at">Created At: {formatDate(exam.createdAt)}</p>
          <button className='result' onClick={() => handleStartExam(exam._id)}>Start Exam</button>
        </div>
      ))}
    </div>
  );
}

export default StExCard;
