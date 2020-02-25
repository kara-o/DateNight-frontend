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
import { rootReducer, initialState } from './reducers';

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('main-container')
);
