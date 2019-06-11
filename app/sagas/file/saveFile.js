import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { SELECTED_FILE_SET } from '../../constants/actions'

import { Files } from '../../datastore'

import { promiseDbInsert } from '../../utils'

export default function* saveFile(action) {
  try {
    const newFile = yield call(promiseDbInsert, Files, action.file)
    yield put({ type: SELECTED_FILE_SET, file: newFile })
    message.success('file saved')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
