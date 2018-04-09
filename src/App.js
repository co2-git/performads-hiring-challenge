import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';

import Home from './components/Home';
import store from './redux/store';
import * as actions from './redux/actions';

// Async connect to in-memory db
actions.connect();

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;
