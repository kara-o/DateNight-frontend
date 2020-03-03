import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/main.css';
import './css/navigation.css';
import './css/form.css';
import './css/sidebar.css';
import './css/grid.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('main-container')
);
