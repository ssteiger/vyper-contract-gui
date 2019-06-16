import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import {
  FILE_SET_SELECTED,
  FILES_FETCH_ALL,
} from '../../constants/actions'

import { Files } from '../../datastore'

import {
  fetchFile,
  compileVyperFile,
  promiseDbUpdate,
} from '../../utils'

export default function* reCompileFile(action) {
  try {
    // fetch new file content
    const file = yield call(fetchFile, action.file)
    // compile file
    let compiledFile = yield call(compileVyperFile, file)
    compiledFile = { ...compiledFile, deployedAt: { addresses: [], selected: {} } }
    // save file in database
    const { _id } = action.file
    const   query_find = { _id }
    const query_change = { $set: { ...compiledFile } }
    yield call(promiseDbUpdate, Files, query_find, query_change)
    // update view
    yield put({ type: FILE_SET_SELECTED, file: compiledFile })
    yield put({ type: FILES_FETCH_ALL })
    message.success('file compiled')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
