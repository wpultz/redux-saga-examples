import 'isomorphic-fetch'
import serializeError from 'serialize-error'

import {
  randomWordRequest, randomWordSuccess, randomWordFailure,
  definitionRequest, definitionSuccess, definitionFailure
} from '../actions'



export const fetchRandomWord = () => {
  return (dispatch) => {
    dispatch(randomWordRequest())

    return fetch('http://www.setgetgo.com/randomword/get.php')
      .then(resp => resp.text())
      .then(word => {
        dispatch(randomWordSuccess(word))
        return word
      })
      .catch(err => {
        dispatch(randomWordFailure(serializeError(err)))
      })
  }
}


export const fetchDefinition = word => {
  return (dispatch) => {
    dispatch(definitionRequest())

    return fetch('/definition/' + word)
      .then(resp => resp.text())
      .then(txtResp => {
        const parsedResponse = JSON.parse(txtResp)

        // this is intentionally lax in it's validation. if we can't get that data out of the response, let the catch
        // pick up the exception and dispatch the error action
        const definition = parsedResponse.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
        dispatch(definitionSuccess(word, definition))
      })
      .catch(err => {
        dispatch(definitionFailure(word, serializeError(err)))
      })
  }
}


// this is bad, there is too much going on here
export const fetchRandomWordPlus = () => {
  return (dispatch) => {
    dispatch(randomWordRequest())

    return fetch('http://www.setgetgo.com/randomword/get.php')
      .then(resp => resp.text())
      .then(word => {
        dispatch(randomWordSuccess(word))
        // this is where things have started to go downhill
        // this thunk is now dispatching another thunk, that will dispatch more actions
        dispatch(fetchDefinition(word))
      })
      .catch(err => {
        dispatch(randomWordFailure(serializeError(err)))
      })
  }
}
