import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import {
  FILE_SET_SELECTED,
  FILES_FETCH_ALL,
} from '../../constants/actions'

import { Files } from '../../datastore'

import {
  promiseDbFind,
  promiseDbInsert,
  fetchFile,
  compileVyperFile,
} from '../../utils'

export default function* uploadFile(action) {
  try {
    // check if file exists
    const results = yield call(promiseDbFind, Files, { path: action.file.path })
    if (results.length === 0) {
      // fetch file content
      const file = yield call(fetchFile, action.file)
      // compile file
      const compiledFile = yield call(compileVyperFile, file)
      // save file in database
      const newFile = yield call(promiseDbInsert, Files, compiledFile)
      // update view
      yield put({ type: FILE_SET_SELECTED, file: newFile })
      yield put({ type: FILES_FETCH_ALL })
      message.success('file saved')
    } else {
      message.error('file already added')
    }
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
