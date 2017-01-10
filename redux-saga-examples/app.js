import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import { Router, browserHistory, Route, IndexRedirect } from 'react-router'

import ThunkExample from './containers/ThunkExample'
import SagaExample from './containers/SagaExample'

// auto-generated, attempt to get the initial state from another source, such as localStorage
const initialState = undefined;
const store = configureStore(initialState);

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/">
        <IndexRedirect to="thunks" />
        <Route path="/thunks" component={ ThunkExample } />
        <Route path="/sagas" component={ SagaExample } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('saga-examples')
);
