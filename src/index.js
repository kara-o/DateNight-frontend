import React from 'react';
import ReactDOM from 'react-dom';
import App from './user/components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import './main.css';
import './navigation.css';
import './form.css';
import './sidebar.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('main-container')
);
