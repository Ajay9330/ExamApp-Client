import React, { useState } from 'react';
import './TeachDash.css'; // Import the separate CSS file
import lp from './media/profile.svg';
import lex from './media/exam.svg';
import lsrch from './media/search.svg';
import lcre from './media/create.svg';
import Profile from './Dashcomp/profile';
import CreateExam from '../exam/Createxam';
import Exams from './Dashcomp/ex/Exams';
import Create from './Dashcomp/ex/Create';




function SearchStudentOrTeacher() {
  return <div>Search Student or Teacher Component</div>;
}

function TeachDash({ props }) {
  const [selectedLink, setSelectedLink] = useState('profile');
  const [isLeftActive, setIsLeftActive] = useState(false); // Control left section visibility

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const toggleLeftSection = () => {
    setIsLeftActive(!isLeftActive);
  };

  const renderRightComponent = () => {
    switch (selectedLink) {
      case 'profile':
        return <Profile props={props} />;
      case 'create-exam':
        return <Create />;
      case 'exams':
        return <Exams />;
      case 'search-student-teacher':
        return <SearchStudentOrTeacher />;
      default:
        return null; // Return a default component or message for unknown links
    }
  };

  return (
    <div className="teach-dash-container">
      <div className={`teach-dash-left ${isLeftActive ? 'active' : ''}`}>
        <button className="hamburger-button" onClick={toggleLeftSection}>
          <span className='toggle-button'>☰</span>
        </button>
        <ul>
          {/* Links */}
          <li onClick={() => handleLinkClick('profile')} className={selectedLink === 'profile' ? 'active' : ''}>
            <span className="link-icon"><img src={lp} alt="" /></span>
            {isLeftActive && <span className="link-label">Profile</span>}
          </li>
          <li onClick={() => handleLinkClick('create-exam')} className={selectedLink === 'create-exam' ? 'active' : ''}>
            <span className="link-icon"><img src={lcre} alt="" /></span>
            {isLeftActive && <span className="link-label">Create Exam</span>}
          </li>
          <li onClick={() => handleLinkClick('exams')} className={selectedLink === 'exams' ? 'active' : ''}>
            <span className="link-icon"><img src={lex} alt="" /></span>
            {isLeftActive && <span className="link-label">Exams</span>}
          </li>
          <li onClick={() => handleLinkClick('search-student-teacher')} className={selectedLink === 'search-student-teacher' ? 'active' : ''}>
            <span className="link-icon"><img src={lsrch} alt="" /></span>
            {isLeftActive && <span className="link-label">Search Student/Teacher</span>}
          </li>
        </ul>
      </div>
      <div className="teach-dash-right">
        {renderRightComponent()}
      </div>
    </div>
  );
}

export default TeachDash;
