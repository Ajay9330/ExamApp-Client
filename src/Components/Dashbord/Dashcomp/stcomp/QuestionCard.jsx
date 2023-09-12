import React from 'react';

function QuestionCard({ questionNumber, question, selectedOptionIndex, onOptionSelect }) {
  const handleOptionChange = (index) => {
    onOptionSelect(index); // Call the parent's handler to update selectedOptionIndex
  };

  return (
    <div className="question-card">
      <p className="question-text">
        <span className="question-number">Question {questionNumber}:</span>
        {question.text}
      </p>
      <div className="options">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`f `}
            onClick={() => handleOptionChange(index)}
          >
            <input
              type='radio'
              name={`question_${questionNumber}_options`}
              checked={selectedOptionIndex === index}
              onChange={() => {}} // Add an empty onChange handler to satisfy React
            />
            <span className={`soption ${selectedOptionIndex === index ? 'aselected' : ''}`}>
              {option}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
