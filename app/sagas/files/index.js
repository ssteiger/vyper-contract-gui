import { takeEvery } from 'redux-saga/effects'

import { FILES_FETCH_ALL } from '../../constants/actions'

import fetchAllFiles from './fetchAllFiles'

export default function* filesSaga() {
  yield takeEvery(FILES_FETCH_ALL, fetchAllFiles)
}
