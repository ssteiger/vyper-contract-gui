import { call, put, takeEvery } from 'redux-saga/effects'
import { message } from 'antd'

import {
  FILES_UPLOAD,
  FILES_COMPILE,
  FILES_RECOMPILE,
  FILES_SAVE,
  FILES_UPDATE,
  FILES_FETCH_ALL,
  SELECTED_FILE_SET,
} from '../constants/actions'

import { Files } from '../datastore'

import {
  promiseDbInsert,
  promiseDbFind,
  promiseDbUpdate,

  uploadVyperFile,
  compileVyperFile,
} from '../utils'

export function* uploadFile(action) {
  try {
    const results = yield call(promiseDbFind, Files, { path: action.file.path })
    if (results.length == 0) {
      const file = yield call(uploadVyperFile, action.file)
      yield put({ type: FILES_COMPILE, file })
    } else {
      message.error('file already added')
    }
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* compileFile(action) {
  try {
    const compiledFile = yield call(compileVyperFile, action.file)
    yield put({ type: FILES_SAVE, file: compiledFile })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* reCompileFile(action) {
  try {
    const file = yield call(uploadVyperFile, action.file)
    const compiledFile = yield call(compileVyperFile, file)
    const query_find = { _id: compiledFile._id }
    const query_change = {
      $set: { ...compiledFile }
    }
    yield call(promiseDbUpdate, Files, query_find, query_change)
    yield put({ type: SELECTED_FILE_SET, file: compiledFile })
    yield put({ type: FILES_FETCH_ALL })
    message.success('file compiled')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* saveFile(action) {
  try {
    const newFile = yield call(promiseDbInsert, Files, action.file)
    yield put({ type: SELECTED_FILE_SET, file: newFile })
    message.success('file saved')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* addFileSaga() {
  yield takeEvery(FILES_UPLOAD, uploadFile)
  yield takeEvery(FILES_COMPILE, compileFile)
  yield takeEvery(FILES_RECOMPILE, reCompileFile)
  yield takeEvery(FILES_SAVE, saveFile)
}
