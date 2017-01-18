import 'isomorphic-fetch'
import { call, put, take, cancel, fork, race, takeEvery } from 'redux-saga/effects'

import { fetchRandomWord, fetchDefinition } from '../api'

import {
  randomWordRequest, randomWordSuccess, randomWordFailure,
  definitionSuccess, definitionFailure
} from '../actions'


// generator to fetch a random word
export function* handleFetchRandomWord() {
  try {
    const wordResp = yield call(fetchRandomWord)
    yield put(randomWordSuccess(wordResp))
  } catch(err) {
    yield put(randomWordFailure(err))
  }
}


// generator to call the word fetching generator on FETCH_RANDOM_WORD
export function* watchFetchRandomWord() {
  yield takeEvery('FETCH_RANDOM_WORD', handleFetchRandomWord)
}


// generator to console a friendly message
function* alsoDoThis() {
  console.log('this also happens on FETCH_RANDOM_WORD')
}


// this illustrates that two sagas can be triggered from the same action
export function* doMeDoMe() {
  yield takeEvery('FETCH_RANDOM_WORD', alsoDoThis)
}


// generator to fetch the definition of a word
export function* handleFetchDefinition(action) {
  try {
    const definition = yield call(fetchDefinition, action.payload)
    yield put(definitionSuccess(action.payload, definition))
  } catch(err) {
    yield put(definitionFailure(action.payload, err))
  }
}


// generator to call definition fetching generator on FETCH_WORD_DEFINITION
export function* watchFetchDefinition() {
  yield takeEvery('FETCH_WORD_DEFINITION', handleFetchDefinition)
}


// generator to fetch a random word and then fetch the word's definition
export function* fetchRandomWordPlus() {
  try {
    yield put(randomWordRequest())

    const word = yield call(fetchRandomWord)
    const definition = yield call(fetchDefinition, word)

    yield put(definitionSuccess(word, definition))
  } catch(err) {
    yield put({ type: 'WORD_AND_DEFINITION_FAILURE' })
  }
}


// generator to call the word + definition generator on FETCH_WORD_AND_DEFINITION
export function* watchFetchRandomWordAndDefinition() {
  yield takeEvery('FETCH_WORD_AND_DEFINITION', fetchRandomWordPlus)
}


// helper generator to return a promise that resolves after 5 seconds
function* wait(ms) {
  yield new Promise(resolve => setTimeout(() => resolve(), ms))
}


// generator to continuously call the word + definition generator on a 5 second interval
function* fetchForever() {
  try {
    while (true) {
      // the yield* statement delegates the yield to the called generator
      yield* fetchRandomWordPlus()
      yield* wait(5000)
    }
  } finally {
    // cancelling this saga from where if was called will break it out of the loop
  }
}


// generator to start the word + definition generator on START_FETCHING, and cancel it on STOP_FETCHING
export function* justKeepFetchingV1() {
  while (yield take('START_FETCHING')) {
    // crank up the fetching task as an async task
    const fetchingTask = yield fork(fetchForever)

    // wait until the STOP_FETCHING action is encountered, using the saga take effect
    yield take('STOP_FETCHING')

    // cancel the fetching task with the saga cancel effect
    yield cancel(fetchingTask)

    // control will now go back to the condition of the while loop, where the it will
    // wait until the START_FETCHING action is encountered again
  }
}


// the same as the justKeepFetching generator, but uses a race effect
export function* justKeepFetching() {
  while (true) {
    yield take('START_FETCHING')

    // the race effect will start both effects
    // the first effect to finish "wins", the other is cancelled
    yield race({
      poll: call(fetchForever),
      stop: take('STOP_FETCHING')
    })

    // once the race effect has completed, the flow with go back to the beginning of the
    // while loop, where it will wait for the START_FETCHING action again
  }
}
