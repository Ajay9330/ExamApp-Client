import React, { useState, useEffect } from 'react';
import ExamCard from './Examcard';
import ConfirmDialog from '../../../conloadcomp/ConfirmDialog';
import './exams.css'
import Loading from '../../../Loading';

function Exams() {
  const [exams, setExams] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isloading,setloading]=useState(true);

  useEffect(() => {
    const fetchRecentExams = async () => {
      try {
        setloading(true);
        const response = await fetch(process.env.REACT_APP_apiurl+'/recent-exams', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch recent exams');
        }
  
        const data = await response.json();
        setExams(data.exams);
      } catch (error) {
        console.error('Error fetching recent exams:', error);
      }finally{
        setloading(false);
      }
    };
  
    fetchRecentExams();
  }, []);
  

  const deleteExam = async (examId) => {
    try {
      setloading(true);
      const response = await fetch(process.env.REACT_APP_apiurl+`/delete-exam/${examId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove the deleted exam from the state
        setExams(prevExams => prevExams.filter(exam => exam._id !== examId));
      } else {
        console.error('Error deleting exam');
      }
    } catch (error) {
      console.error('Error deleting exam:', error);
    }finally{
      setloading(false);
    }
  };

  function handleDeleteConfirmation(examId) {
    setSelectedExam(examId);
    setShowConfirmDialog(true);
  }

  return (
    <div className='exam-card-contain'>
      {/* <CreateExam /> */}
      {exams.map(exam => (
        <ExamCard key={exam._id} exam={exam} onDelete={handleDeleteConfirmation} />
      ))}
    {isloading && <Loading/>}
      {showConfirmDialog && (
        <ConfirmDialog
          title="Delete Exam"
          message="Are you sure you want to delete this exam?"
          onConfirm={() => {
            deleteExam(selectedExam);
            setShowConfirmDialog(false);
          }}
          onCancel={() => {
            setShowConfirmDialog(false);
          }}
        />
      )}
    </div>
  );
}

export default Exams;
