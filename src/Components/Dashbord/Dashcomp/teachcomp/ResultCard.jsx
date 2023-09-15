import React, { useState } from 'react';


function ResultCard({ result }) {
  const [showAnswers, setShowAnswers] = useState(false);


  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
<div className={`result-card ${!showAnswers ? "t" : ""}`}>


<div className="info-item">
        <p className="info-label">Student Name:</p>
        <span className="info-value">{result.studentName}</span>
      </div>

      <div className="info-item">
        <p className="info-label">Correct Answers:</p>
        <p className="info-value">{result.score}</p>
      </div>

      <div className="info-item">
        <p className="info-label">Student Seat:</p>
        <p className="info-value">{result.studentSeat}</p>
      </div>

      <div className="info-item">
        <p className="info-label">Exam Start Time:</p>
        <span className="info-value">{new Date(result.examStartAt).toLocaleString()}</span>
      </div>

      <div className="info-item">
        <p className="info-label">Submitted At:</p>
        <p className="info-value">{new Date(result.submittedAt).toLocaleString()}</p>
      </div>

      <div className="info-item">
        <p className="info-label">Student Class:</p>
        <p className="info-value">{result.studentClass}</p>
      </div>
 

      <button className="result" onClick={toggleAnswers}>
        {showAnswers ? 'Hide Answers' : 'Show Answers'}
      </button>

      {showAnswers && (
        <div  className="answers">
          <h4 className="answers-title">Answers</h4>
          <ul className="answers-list">
            {result.answers.map((answer, index) => (
              <li 
                className={`answer ${answer.isCorrect ? 'correct-answer' : 'wrong-answer'}`}
                key={answer.questionId}
              >
                <p className="answer-text">Question {index + 1}: {answer.questiontext}</p>
                <ul className="options-list">
                  {answer.options.map((option, optionIndex) => (
                    <li
                      className={`optionp ${optionIndex === answer.selectedOptionIndex ? 'selected' : ''}`}
                      key={optionIndex}
                    >
                      {optionIndex + 1}: {option}
                    </li>
                  ))}
                </ul>
                <p className="is-correct">CorrectOption-Number: {answer.correctOptionIndex+1}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="score">Score: {result.score}</p>
    </div>
  );
}

export default ResultCard;
