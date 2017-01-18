import {
  watchFetchRandomWord,
  watchFetchDefinition,
  watchFetchRandomWordAndDefinition,
  justKeepFetching,
  doMeDoMe
} from './definitions'

export default function* rootSaga() {
  yield [
    watchFetchRandomWord(),
    watchFetchDefinition(),
    watchFetchRandomWordAndDefinition(),
    justKeepFetching(),
    doMeDoMe()
  ]
}
