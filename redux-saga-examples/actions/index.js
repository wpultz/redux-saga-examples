import 'isomorphic-fetch'

export const randomWordRequest = () => ({
  type: 'RANDOM_WORD_REQUEST'
})


export const randomWordSuccess = word => ({
  type: 'RANDOM_WORD_SUCCESS',
  payload: word
})


export const randomWordFailure = err => ({
  type: 'RANDOM_WORD_FAILURE',
  payload: err
})


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
        console.log(err)
        dispatch(randomWordFailure(err))
      })
  }
}


export const definitionRequest = word => ({
  type: 'DEFINITION_REQUEST',
  payload: word
})


export const definitionSuccess = (word, definition) => ({
  type: 'DEFINITION_SUCCESS',
  payload: {
    word,
    definition
  }
})


export const definitionFailure = (word, err) => ({
  type: 'DEFINITION_FAILURE',
  payload: {
    word,
    err
  }
})


export const fetchDefinition = word => {
  return (dispatch) => {
    dispatch(definitionRequest())

    return fetch('/definition/' + word)
      .then(resp => {
        console.log(resp)
        dispatch(definitionSuccess(word, resp))
      })
      .catch(err => {
        console.log(resp)
        dispatch(definitionFailure(word, err))
      })
  }
}
