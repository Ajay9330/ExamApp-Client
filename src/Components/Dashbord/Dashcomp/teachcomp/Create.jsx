import React, { useState } from 'react'
import CreateExam from '../../../exam/Createxam';
import './create.css';
import luser from '../../media/adduser.svg'
import AddUser from './Adduser';
export default function Create() {
    const[active,setactive]=useState('exam');
  return (
    <>
        <nav className='create-nav'>
            <ul>
                <li className={active==='exam'?"active":""} onClick={()=>setactive("exam")}>Create Exam</li>
                <li className={active==='user'?"active":""} onClick={()=>setactive("user")}>
                    <img src={luser} alt="" />Add Users</li>
                
            </ul>
        </nav>

        {active==="exam" && <CreateExam />}
        {active === "user" && (
  <div style={{ padding: '20px',display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center' }}>
    <AddUser />
  </div>
)}

        
    </>
  )
}
