import React, { useState } from 'react';


function ResultCard({ result }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
<div className={`result-card ${!showAnswers ? "t" : ""}`}>

      <p className="info">Student Name: {result.studentName}</p>
      <p className="info">Correct Answers: {result.score}</p>
      <p className="info">Student Seat: {result.studentSeat}</p>
      <p className="info">Exam Start Time: {new Date(result.examStartAt).toLocaleString()}</p>
      <p className="info">Submitted At: {new Date(result.submittedAt).toLocaleString()}</p>
      <p className="info">Student Class: {result.studentClass}</p>

      <button className="toggle-button" onClick={toggleAnswers}>
        {showAnswers ? 'Hide Answers' : 'Show Answers'}
      </button>

      {showAnswers && (
        <div className="answers">
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
