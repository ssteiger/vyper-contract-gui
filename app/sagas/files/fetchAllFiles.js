import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { FILES_SHOW_ALL } from '../../constants/actions'

import { Files } from '../../datastore'

import { promiseDbFind } from '../../utils'

export default function* fetchAllFiles(action) {
  try {
    const files = yield call(promiseDbFind, Files, {})
    yield put({ type: FILES_SHOW_ALL, files })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
