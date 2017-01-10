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
