import React, { useState, useEffect } from 'react';
import ExamCard from './Examcard';
import CreateExam from '../../../exam/Createxam';
import ConfirmDialog from '../../../conloadcomp/ConfirmDialog';
import './exams.css'

function Exams() {
  const [exams, setExams] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    // Fetch recent exams
    fetch('http://localhost:3300/recent-exams', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setExams(data.exams);
      })
      .catch(error => {
        console.error('Error fetching recent exams:', error);
      });
  }, []);

  const deleteExam = async (examId) => {
    try {
      const response = await fetch(`http://localhost:3300/delete-exam/${examId}`, {
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
