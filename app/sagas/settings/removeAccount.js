import { call, put, takeEvery } from 'redux-saga/effects'
import { message } from 'antd'

import { WEB3_INIT } from '../../constants/actions'

import { Settings } from '../../datastore'

import { promiseDbUpdate } from '../../utils'

export default function* removeAccount(action) {
  try {
    const query_find = { _id: 'accounts' }
    const query_update = { $pull: { accounts: { address: action.account.address } } }
    yield call(promiseDbUpdate, Settings, query_find, query_update)
    yield put({ type: WEB3_INIT })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
