import React, { useState } from 'react';
import './TeachStDash.css'; // Import the separate CSS file
import lp from './media/profile.svg';
import lex from './media/exam.svg';
import lsrch from './media/search.svg';
import lcre from './media/create.svg';
import Profile from './Dashcomp/profile';
// import CreateExam from '../exam/Createxam';
import Exams from './Dashcomp/teachcomp/Exams';
import Create from './Dashcomp/teachcomp/Create';
import SearchUser from './Dashcomp/teachcomp/search';
import StExam from './Dashcomp/stcomp/StExam';
import Result from './Dashcomp/teachcomp/Result';




function SearchStudentOrTeacher() {
  return <SearchUser/>
}

function TeachStDash({ props }) {
  const [selectedLink, setSelectedLink] = useState('profile');
  const [isLeftActive, setIsLeftActive] = useState(false); // Control left section visibility

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const toggleLeftSection = () => {
    setIsLeftActive(!isLeftActive);
  };

  const renderRightComponent = () => {
    if(props.userType==='teacher'){
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
    }else if(props.userType==='student'){
      switch (selectedLink) {
        case 'profile':
          return <Profile props={props} />;
        case 'exam':
          return <StExam />;
        case 'results':
          return <Result props={props} />;
        // case 'search-student-teacher':
        //   return <SearchStudentOrTeacher />;
        default:
          return null; // Return a default component or message for unknown links
      }
    }
    
  };

  return (
    <div className="teach-dash-container">
      <div className={`teach-dash-left ${isLeftActive ? 'active' : ''}`}>
        <button className="hamburger-button" onClick={toggleLeftSection}>
          <span className='dashtoggle-button'>☰</span>
        </button>
        <ul>
        <li onClick={() => handleLinkClick('profile')} className={selectedLink === 'profile' ? 'active' : ''}>
            <span className="link-icon"><img src={lp} alt="" /></span>
            {isLeftActive && <span className="link-label">Profile</span>}
          </li>
          {/* teacher links */}
          {props.userType==='teacher' && <>
          <li onClick={() => handleLinkClick('create-exam')} className={selectedLink === 'create-exam' ? 'active' : ''}>
            <span className="link-icon"><img src={lcre} alt="" /></span>
            {isLeftActive && <span className="link-label">Create/Add</span>}
          </li>
          <li onClick={() => handleLinkClick('exams')} className={selectedLink === 'exams' ? 'active' : ''}>
            <span className="link-icon"><img src={lex} alt="" /></span>
            {isLeftActive && <span className="link-label">Exams</span>}
          </li>
          <li onClick={() => handleLinkClick('search-student-teacher')} className={selectedLink === 'search-student-teacher' ? 'active' : ''}>
            <span className="link-icon"><img src={lsrch} alt="" /></span>
            {isLeftActive && <span className="link-label">Search Users</span>}
          </li>
          </>}

        {/* student link */}

        {props.userType==='student' && <>
          <li onClick={() => handleLinkClick('exam')} className={selectedLink === 'exam' ? 'active' : ''}>
            <span className="link-icon"><img src={lcre} alt="" /></span>
            {isLeftActive && <span className="link-label">Exam</span>}
          </li>
          <li onClick={() => handleLinkClick('results')} className={selectedLink === 'results' ? 'active' : ''}>
            <span className="link-icon"><img src={lex} alt="" /></span>
            {isLeftActive && <span className="link-label">My Results</span>}
          </li>
       
          </>}

        </ul>
      </div>
      <div className="teach-dash-right">
        {renderRightComponent()}
      </div>
    </div>
  );
}

export default TeachStDash;
