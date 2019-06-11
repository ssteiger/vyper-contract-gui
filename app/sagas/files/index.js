import { takeEvery } from 'redux-saga/effects'

import {
  FILES_UPDATE,
  FILES_REMOVE,
  FILES_FETCH_ALL,
} from '../../constants/actions'

import updateFiles from './updateFiles'
import removeFile from './removeFile'
import fetchAllFiles from './fetchAllFiles'

export default function* filesSaga() {
  yield takeEvery(FILES_UPDATE, updateFiles)
  yield takeEvery(FILES_REMOVE, removeFile)
  yield takeEvery(FILES_FETCH_ALL, fetchAllFiles)
}
