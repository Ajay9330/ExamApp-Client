import React from 'react';
import './Home.scss';
import Header from './Header';

const Home = () => {
  return (
    <>
    <Header></Header>
    <div className="Home">
      <p>Prepare and take exams with ease.</p>
      <div className="button-container">
        <button>
          Student Login
        </button>
        <button>
          Teacher Login
        </button>
     </div>
    </div>
    </>
  );
};

export default Home;
