import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

// auto-generated, attempt to get the initial state from another source, such as localStorage
const initialState = undefined;
const store = configureStore(initialState);

render(
    <Provider store={store}>
        <div>{'add in your app\'s main container here'}</div>
    </Provider>,
    document.getElementById('saga-examples')
);

