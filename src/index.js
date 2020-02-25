import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/main.css';
import './css/navigation.css';
import './css/form.css';
import './css/sidebar.css';
import './css/grid.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import dateNightApp from './reducers';

const store = createStore(dateNightApp);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('main-container')
);
