import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <h1>Welcome to the Trivia Challenge!</h1>
      <p>You will be presented with 10 True or False questions.</p>
      <p>Can you score 100%?</p>
      <Link to='/quiz'>
        <button className='btn'>BEGIN</button>
      </Link>
    </>
  );
};

export default LandingPage;
