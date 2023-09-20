import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import './studentexam.css';
import QuestionCard from './QuestionCard';
import Loading from '../../../Loading';
import Message from '../../../Message';
import Waiting from '../../../Waiting';
function StudentExam() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndexes, setSelectedOptionIndexes] = useState(Array(0));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isloading,setloading]=useState(false);
  const [message,setmessage]=useState('');
  const [remainingTime, setRemainingTime] = useState(1 * 30);
  const [exdate,setexdate]=useState(null);

  const[iswating,setiswaiting]=useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  

  // Convert remainingTime to a human-readable format (e.g., MM:SS)
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  const seconds = (remainingTime % 60).toString().padStart(2, '0');
  const formattedTime = `${minutes}:${seconds}`;

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setloading(true);
        const response = await fetch(process.env.REACT_APP_apiurl+`/exam/${examId}`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setExam(data);
          console.log(data)
          setRemainingTime(data.duration*60);
          // Initialize selectedOptionIndexes array with -1 for each question
          setSelectedOptionIndexes(Array(data.questions.length).fill(-1));
        } else {
          if(response.status===400){
            setexdate(data.date);
            setiswaiting(true);
          }
          setmessage(data.error);
          console.error('Error fetching exam:', response.statusText);
        }
      } catch (error) {
        setmessage(error);
        console.error('Error fetching exam:', error);
      } finally{
        setloading(false);
      }
    };

    fetchExam();

  }, [examId]);


 
useEffect(() => {

  
  const handleKeyPress = (event) => {
    if (exam && !isSubmitting) {
      if (event.key === 'ArrowRight' && currentQuestionIndex < exam.questions.length - 1) {
        // Handle moving to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (event.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        // Handle moving to the previous question
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    }
  };
    if (!isSubmitting) {
      document.addEventListener('keyup', handleKeyPress);
    } else {
      document.removeEventListener('keyup', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [exam,currentQuestionIndex,isSubmitting]);


  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptionIndexes = [...selectedOptionIndexes];
    newSelectedOptionIndexes[currentQuestionIndex] = optionIndex;
    setSelectedOptionIndexes(newSelectedOptionIndexes);
  };

  const handleNextQuestion = () => {
    console.log('next');
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitExam();
    }
  };

  const handlePreviousQuestion = () => {
    console.log("hi");
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitExam = async () => {
    // Construct the student's answers based on selected options
    const studentAnswers = exam.questions.map((question, index) => ({
      questionId: question._id,
      selectedOptionIndex: selectedOptionIndexes[index],
    }));

    try {
      setIsSubmitting(true);
      
      // Send the student's answers to the server
      const response = await fetch(process.env.REACT_APP_apiurl+'/exam/submit-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({
          examCode:exam.examCode,
          examId: exam._id,
          studentAnswers: studentAnswers,
        }),
      });
      const d=await response.json();
      if (response.ok) {
        // Handle success
        setmessage('Exam subumitted Sucessfully');
        window.location.reload();  // Clear the error message
      } else {
        setmessage(d.error);
        console.error('Error submitting exam:', response.statusText);
      }
      
    } catch (error) {
      console.error('Error submitting exam:', error);
      setmessage(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGridItemClick = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
  };



  return (
    <>{(isloading || isSubmitting)&&<Loading/>}
      {!isloading && message!=="" && <Message onClose={()=>{setmessage("");}} message={message} />}
      {iswating && <Waiting startTime={new Date(exdate)} />}
      {exam &&    <>
      <div className='exBar'><h2>{exam.title+"|"+exam.examCode}</h2>
      <div className="timer">
        <span>Remaining Time:</span>
        <span>{formattedTime}</span>
      </div>
      </div>
      <div className="student-exam-container">
        <div className="qgrid">
          {exam.questions.map((question, index) => (
            <div
              key={index}
              className={`grid-item ${currentQuestionIndex === index ? 'selectedquestion' : ''}`}
              onClick={() => handleGridItemClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
  
        <QuestionCard
          questionNumber={currentQuestionIndex + 1}
          question={exam.questions[currentQuestionIndex]}
          selectedOptionIndex={selectedOptionIndexes[currentQuestionIndex]}
          onOptionSelect={handleOptionSelect}
        />
 
      </div>
      <div className="btn-container">
          <button onClick={handlePreviousQuestion} disabled={isSubmitting}>
            Previous
          </button>
          <button onClick={() => handleOptionSelect(-1)}>Clear</button>
          <button onClick={handleNextQuestion} disabled={isSubmitting}>
            {currentQuestionIndex === exam.questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
          </>}
    </>
  );
}

export default StudentExam;
