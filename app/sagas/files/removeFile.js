import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import {
  FILES_SHOW_ALL,
  SELECTED_FILE_SET,
} from '../../constants/actions'

import { Files } from '../../datastore'

import {
  promiseDbFind,
  promiseDbRemove,
} from '../../utils'

export default function* removeFile(action) {
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
