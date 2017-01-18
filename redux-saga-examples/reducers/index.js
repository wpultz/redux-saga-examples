import { combineReducers } from 'redux';
import { Map } from 'immutable'

const word = (state = Map({ error: false, word: '' }), action) => {
  switch(action.type) {
    case 'RANDOM_WORD_SUCCESS':
      return state
        .set('error', false)
        .set('word', action.payload);

    case 'RANDOM_WORD_FAILURE':
      return state
        .set('error', true)
        .set('word', '');

    case 'DEFINITION_SUCCESS':
      return state
        .set('error', false)
        .set('word', action.payload.word)

    default:
      return state;
  }
}
const definition = (state = Map({ error: false, definition: '' }), action) => {
  switch(action.type) {
    case 'RANDOM_WORD_SUCCESS':
      return state
        .set('error', false)
        .set('definition', '')

    case 'DEFINITION_SUCCESS':
      return state
        .set('error', false)
        .set('definition', action.payload.definition);

    case 'DEFINITION_FAILURE':
      return state
        .set('error', true)
        .set('definition', '')

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // add app reducers and state slice names here
  word,
  definition
});

export default rootReducer;
