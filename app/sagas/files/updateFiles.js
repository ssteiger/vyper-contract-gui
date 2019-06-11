import { call } from 'redux-saga/effects'
import { message } from 'antd'

import { Files } from '../../datastore'

import { promiseDbUpdate } from '../../utils'

export default function* updateFiles(action) {
  try {
    const file = yield call(promiseDbUpdate, Files, action.query.find, action.query.update)
    message.success('file updated')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
