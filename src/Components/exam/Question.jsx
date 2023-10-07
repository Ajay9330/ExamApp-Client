// Question.js
import React from 'react';
import './Question.css';

const Question = ({
  question,
  index,
  handleQuestionChange,
  handleOptionSelect,
  handleOptionChange,
  deleteQuestion,
  deleteOption,
  addOption
}) => (
  <div className="question" key={index}>
    <div >
    <button className="delete-button" onClick={() => deleteQuestion(index)}>
      &#10005; {/* Delete icon using a Unicode symbol */}
    </button>    <span >{index+1}</span>
    </div>
  
    <div>
  
      <input
        type="text"
        placeholder="Question text"
        value={question.text}
        onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
        className="question-input"
      />
      {question.options.map((option, optionIndex) => (
        <div className="option" key={optionIndex}>
          <input
            type="radio"
            name={`question_${index}`}
            value={option}
            checked={optionIndex === question.selectedOptionIndex}
            onChange={() => handleOptionSelect(index, optionIndex)}
          />
          <input
            type="text"
            placeholder={`Option ${optionIndex + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
            className="option-input"
          />
          <button className="delete-option" onClick={() => deleteOption(index, optionIndex)}>
            &#10005; {/* Delete icon using a Unicode symbol */}
          </button>
        </div>
      ))}
      <button className="add-option-button" onClick={() => addOption(index)}>
        + Add Option
      </button>
    </div>
  </div>
);

export default Question;
