import React, { useState } from 'react';
import './CreateExam.css';
import Question from './Question';
import Loading from '../Loading';
import Message from '../Message'; // Import the Message component

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
};

const CreateExam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExamCreated, setIsExamCreated] = useState("closed");
  const [examdetails, setExamDetails] = useState({
    title: '',
    examCode: '',
    date: '',
    time: '',
    duration: '',
    createdBy: getCookie("email"),
  });
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['Option 1', 'Option 2'],
    selectedOptionIndex: 0,
  });

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...newQuestion, options: ['Option 1', 'Option 2'], selectedOptionIndex: 0 }]);
    setNewQuestion({
      text: '',
      options: ['Option 1', 'Option 2'],
      selectedOptionIndex: 0,
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push(`Option ${updatedQuestions[index].options.length + 1}`);
    setQuestions(updatedQuestions);
  };

  const deleteOption = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleOptionSelect = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].selectedOptionIndex = optionIndex;
    setQuestions(updatedQuestions);
  };

  const saveExam = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(process.env.REACT_APP_apiurl+'/createxams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: examdetails.title,
          date: new Date(examdetails.date + "T" + examdetails.time),
          duration: examdetails.duration,
          createdBy: examdetails.createdBy,
          questions: questions.map((q) => ({
            text: q.text,
            options: q.options,
            selectedOptionIndex: q.selectedOptionIndex,
          })),
          examCode: examdetails.examCode,
        }),
      });

      if (response.ok) {
       // const data = await response.json();
       // console.log('Exam saved:', data);
        setIsExamCreated("sucess");
        setExamDetails({
          title: '',
          examCode: '',
          date: '',
          time: '',
          duration: '',
          createdBy: '',
        });
        setQuestions([]);
      } else {
        console.error('Error saving exam:', response.statusText);
        setIsExamCreated("fail");
      }
    } catch (error) {
      console.error('Error saving exam:', error);
      setIsExamCreated("fail");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    }
  };
  const closeMessage = () => {
    setIsExamCreated("close");
  };
  return (
    <>
    <div >

      <div className='exam-form'>
      <input
          type="text"
          placeholder="Title" // Added title placeholder
          value={examdetails.title}
          onChange={(e) => setExamDetails({ ...examdetails, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Exam Code"
          value={examdetails.examCode}
          onChange={(e) => setExamDetails({ ...examdetails, examCode: e.target.value })}
        />
        <input
          type="text"
          placeholder="Created By"
          value={examdetails.createdBy}
          onChange={(e) => setExamDetails({ ...examdetails, createdBy: e.target.value })}
        />
        <input
          type="date"
          value={examdetails.date}
          onChange={(e) => setExamDetails({ ...examdetails, date: e.target.value })}
        />
        <input
          type="time"
          value={examdetails.time}
          onChange={(e) => setExamDetails({ ...examdetails, time: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (in minutes)"
          value={examdetails.duration}
          onChange={(e) => setExamDetails({ ...examdetails, duration: e.target.value })}
        />
      </div>

     <div className='question-cont'> {questions.map((question, index) => (
        <Question
          key={index}
          index={index}
          question={question}
          handleQuestionChange={handleQuestionChange}
          handleOptionSelect={handleOptionSelect}
          handleOptionChange={handleOptionChange}
          deleteQuestion={deleteQuestion}
          deleteOption={deleteOption}
          addOption={addOption}
        />
      ))}</div>
  <div className='ebutton'>
  <button  onClick={addQuestion}>Add Question</button>
      <button onClick={saveExam} disabled={isLoading}>
        Submit Exam
      </button>
  </div>


    </div>
    {isLoading && <Loading />}
      {isExamCreated ==="sucess" && (
        <Message
          type="success"
          message="Exam created successfully!"
          onClose={closeMessage}
        />
      )}
      {!isLoading && isExamCreated === "fail" && (
        <Message
          type="error"
          message="Failed to create exam."
          onClose={closeMessage}
        />
      )}
    </>
  );

};

export default CreateExam;