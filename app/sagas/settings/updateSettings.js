import { call } from 'redux-saga/effects'
import { message } from 'antd'

import { Settings } from '../../datastore'

import {
  promiseDbInsert,
  promiseDbFind,
  promiseDbUpdate,
} from '../../utils'

export default function* updateSettings(action) {
  try {
    const newSettings = action.settings
    const currentSettings = yield call(promiseDbFind, Settings, { _id: 'connections' })
    if (currentSettings[0]) {
      // update
      const file = yield call(promiseDbUpdate, Settings, { _id: 'connections' }, newSettings)
    } else {
      // insert
      newSettings._id = 'connections'
      const file = yield call(promiseDbInsert, Settings, newSettings)
    }
    message.success('settings set')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
