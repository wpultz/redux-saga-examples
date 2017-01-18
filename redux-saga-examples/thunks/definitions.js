import 'isomorphic-fetch'

import * as api from '../api'

import {
  randomWordRequest, randomWordSuccess, randomWordFailure,
  definitionRequest, definitionSuccess, definitionFailure
} from '../actions'


export const fetchRandomWord = () => {
  return (dispatch) => {
    dispatch(randomWordRequest())

    return api.fetchRandomWord()
      .then(word => {
        dispatch(randomWordSuccess(word))
        return word
      })
      .catch(err => {
        dispatch(randomWordFailure(err))
      })
  }
}


export const fetchDefinition = word => {
  return (dispatch) => {
    dispatch(definitionRequest())

    return api.fetchDefinition(word)
      .then(definition => {
        dispatch(definitionSuccess(word, definition))
      })
      .catch(err => {
        dispatch(definitionFailure(word, err))
      })
  }
}


// this is bad, lots of `then`ing and callbacks
export const fetchRandomWordPlus = () => {
  return (dispatch) => {
    dispatch(randomWordRequest())

    return dispatch(fetchRandomWord())
      .then(word => {
        dispatch(randomWordSuccess(word))
        // this is where things have started to go downhill
        // this thunk is now dispatching another thunk, that will dispatch more actions
        dispatch(fetchDefinition(word))
      })
      .catch(err => {
        dispatch(randomWordFailure(err))
      })
  }
}
