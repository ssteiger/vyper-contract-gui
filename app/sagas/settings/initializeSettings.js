import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { SETTINGS_UPDATE } from '../../constants/actions'

import { Settings } from '../../datastore'

import { promiseDbFind } from '../../utils'

export default function* initializeSettings(action) {
  try {
    const currentSettings = yield call(promiseDbFind, Settings, { _id: 'connections' })
    if (!currentSettings[0]) {
      const initial_settings = {
        _id: 'connections',
        rpcServer: 'http://127.0.0.1:7545',
        compilerUrl: 'http://127.0.0.1:8000/compile',
      }
      message.success('settings initialized')
      message.info(`rpc: ${initial_settings.rpcServer}`)
      message.info(`compiler: ${initial_settings.compilerUrl}`)
      yield put({ type: SETTINGS_UPDATE, settings: initial_settings })
    } else {
      yield put({ type: SETTINGS_UPDATE, settings: currentSettings[0] })
    }
  } catch (e) {
    console.log(e)
  }
}
