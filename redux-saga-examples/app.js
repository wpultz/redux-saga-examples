import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import Main from './containers'

// auto-generated, attempt to get the initial state from another source, such as localStorage
const initialState = undefined;
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('saga-examples')
);
