import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className='main'>
      <Link className='request' to='/request'>
        Make a New Request!
      </Link>
    </div>
  );
};

export default Main;
