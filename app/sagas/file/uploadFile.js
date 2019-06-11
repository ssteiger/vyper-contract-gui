import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { FILES_COMPILE } from '../../constants/actions'

import { Files } from '../../datastore'

import {
  promiseDbFind,
  uploadVyperFile,
} from '../../utils'

export default function* uploadFile(action) {
  try {
    const results = yield call(promiseDbFind, Files, { path: action.file.path })
    if (results.length === 0) {
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
