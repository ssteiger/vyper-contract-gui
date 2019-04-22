import { call, put, takeEvery } from 'redux-saga/effects'
import { message } from 'antd'

import {
  FILES_FETCH_ALL,
  FILES_SHOW_ALL,
  FILES_UPDATE,
  FILES_REMOVE,
  FILE_GET_CONTRACT_BALANCES,
  SELECTED_FILE_SET,
} from '../constants/actions'

import { Files } from '../datastore'

import {
  promiseDbFind,
  promiseDbUpdate,
  promiseDbRemove,
} from '../utils'

export function* fetchAllFiles(action) {
  try {
    const files = yield call(promiseDbFind, Files, {})
    yield put({ type: FILES_SHOW_ALL, files })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* updateFiles(action) {
  try {
    const file = yield call(promiseDbUpdate, Files, action.query.find, action.query.update)
    message.success('file updated')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* removeFile(action) {
  try {
    const query = { _id: action.file._id }
    yield call(promiseDbRemove, Files, query)
    const files = yield call(promiseDbFind, Files, {})
    yield put({ type: FILES_SHOW_ALL, files })
    yield put({ type: SELECTED_FILE_SET, file: files[0] })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* filesSaga() {
  yield takeEvery(FILES_FETCH_ALL, fetchAllFiles)
  yield takeEvery(FILES_UPDATE, updateFiles)
  yield takeEvery(FILES_REMOVE, removeFile)
}
