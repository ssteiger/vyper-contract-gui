import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { FILES_SAVE } from '../../constants/actions'

import { compileVyperFile } from '../../utils'

export default function* compileFile(action) {
  try {
    const compiledFile = yield call(compileVyperFile, action.file)
    yield put({ type: FILES_SAVE, file: compiledFile })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
