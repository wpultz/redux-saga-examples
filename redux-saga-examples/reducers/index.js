import { combineReducers } from 'redux';
// import other reducers for the app here

const reduzer = (state = {}, action) => state;

const rootReducer = combineReducers({
    // add app reducers and state slice names here
    slice: reduzer
});

export default rootReducer;
