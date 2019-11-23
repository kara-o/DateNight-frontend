import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import './main.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('main-container')
);
