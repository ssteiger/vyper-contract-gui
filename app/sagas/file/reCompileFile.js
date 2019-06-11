import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import {
  SELECTED_FILE_SET,
  FILES_FETCH_ALL,
} from '../../constants/actions'

import { Files } from '../../datastore'

import {
  uploadVyperFile,
  compileVyperFile,
  promiseDbUpdate,
} from '../../utils'

export default function* reCompileFile(action) {
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
