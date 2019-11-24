import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Main from './Main';

const Home = () => {
  return (
    <div className='home'>
      <Link to='/request' />
      <Sidebar />
      <Main />
    </div>
  );
};

export default Home;
