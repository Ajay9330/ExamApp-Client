import React, { useState } from 'react';
import './examcard.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function ExamCard({ exam, onDelete }) {
  const [showQuestions, setShowQuestions] = useState(false);

  const toggleQuestions = () => {
    setShowQuestions(prevState => !prevState);
  };

  const navigate = useNavigate();

  const handleShowResultClick = () => {
    navigate(`/exam/result/${exam._id}`);
  };

  return (
    <div className="exam-card">
      <h1 className="exam-title">
        {exam.title} | <span>{exam.examCode}</span>
      </h1>
      <h2 className="exam-date">Start At: {formatDate(exam.date)}</h2>
      <p className="exam-duration">Duration: {exam.duration} minutes</p>

      <p className="exam-created-by">Created By: {exam.createdBy}</p>
      <p className="exam-created-by">Created At: {formatDate(exam.createdAt)}</p>
      <div>
        <button className="exp" onClick={toggleQuestions}>
          {showQuestions ? (
            <i className="material-icons">visibility_off</i>
          ) : (
            <i className="material-icons">visibility</i>
          )}
        </button>
        <button className="show-result-button result" onClick={handleShowResultClick}>
          <i className="material-icons">bar_chart</i> Show Result
        </button>
        <button className="idelete-button" onClick={() => onDelete(exam._id)}>
          <i className="material-icons">delete</i>
        </button>
      </div>

      {true && (
        <ul className={`questions-list ${showQuestions ? 'show' : ''}`}>
          {exam.questions.map((question, index) => (
            <li className="questiont" key={question._id}>
              <p className="ecquestion-text">{index + 1}. {question.text}</p>
              <ul className="ecoptions-list">
                {question.options.map((option, optionIndex) => (
                  <li
                    className={`ecoption ${question.selectedOptionIndex === optionIndex ? 'ecselected' : ''}`}
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
