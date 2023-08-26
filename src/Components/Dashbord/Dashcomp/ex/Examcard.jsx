import React, { useState } from 'react';
import './examcard.css';
import PropTypes from 'prop-types';

function ExamCard({ exam, onDelete }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const toggleQuestions = () => {
    setShowQuestions(prevState => !prevState);
  };

  return (
    <div className="exam-card">
      <h3 className="exam-title">{exam.title}</h3>
      <p className="exam-date">Date: {exam.date}</p>
      <p className="exam-duration">Duration: {exam.duration} minutes</p>
      <p className="exam-code">Exam Code: {exam.examCode}</p>
      <p className="exam-created-by">Created By: {exam.createdBy}</p>
      <p className="exam-created-by">Created At: {exam.createdAt}</p>

      <button className="toggle-questions-button" onClick={toggleQuestions}>
        {showQuestions ? 'Hide Questions ' : 'Show Questions'}
      </button>
     
      <button className="idelete-button" onClick={() => onDelete(exam._id)}>
        <span className="idelete-icon">x </span> 
      </button>
     
      {showQuestions && (
        <ul className="questions-list">
          {exam.questions.map((question, index) => (
            <li className="question" key={question._id}>
                
              <p className="question-text">{index + 1}. {question.text}</p>
              <ul className="options-list">
                {question.options.map((option, optionIndex) => (
                  <li
                    className={`option ${question.selectedOptionIndex === optionIndex ? 'selected' : ''}`}
                    key={optionIndex}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}


    </div>
  );
}

ExamCard.propTypes = {
  exam: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExamCard;
