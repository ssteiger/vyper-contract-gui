import { call, put, takeEvery } from 'redux-saga/effects'
import { message } from 'antd'

import {
  SETTINGS_INIT,
  SETTINGS_UPDATE,
  SETTINGS_IMPORT_ACCOUNT,
  SETTINGS_REMOVE_ACCOUNT,
  SETTINGS_GENERATE_RANDOM_ACCOUNT,
  SETTINGS_RESET,
  WEB3_INIT,
} from '../constants/actions'

import { Settings } from '../datastore'

import {
  promiseDbInsert,
  promiseDbFind,
  promiseDbUpdate,

  getWeb3,
  compileVyperFile,
} from '../utils'

export function* initializeSettings(action) {
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

export function* updateSettings(action) {
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

export function* importAccountFromPrivateKey(action) {
  try {
    const web3 = yield call(getWeb3)
    const generateAccountFromPKPromise = (privateKey) => {
      return new Promise((resolve, reject) => {
        resolve(web3.eth.accounts.privateKeyToAccount(privateKey))
      })
    }
    const account = yield call(generateAccountFromPKPromise, action.privateKey)
    const query_find = { _id: 'accounts' }
    const query_update = { $push: {accounts: account} }
    yield call(promiseDbUpdate, Settings, query_find, query_update)
    yield put({ type: WEB3_INIT })
    message.success('key imported')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* generateRandomAccount(action) {
  try {
    const web3 = yield call(getWeb3)
    const generateRandomAccountPromise = () => {
      return new Promise((resolve, reject) => {
        // TODO: create 'real' entropy
        const entropy = '+++'
        resolve(web3.eth.accounts.create(entropy))
      })
    }
    const account = yield call(generateRandomAccountPromise)
    const query_find = { _id: 'accounts' }
    const query_update = { $push: {accounts: account} }
    yield call(promiseDbUpdate, Settings, query_find, query_update)
    yield put({ type: WEB3_INIT })
    message.success('account created')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}


export function* removeAccount(action) {
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

// TODO:
export function* resetSettings(action) {
  console.log(action)
  try {

  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* settingsSaga() {
  yield takeEvery(SETTINGS_INIT, initializeSettings)
  yield takeEvery(SETTINGS_UPDATE, updateSettings)
  yield takeEvery(SETTINGS_IMPORT_ACCOUNT, importAccountFromPrivateKey)
  yield takeEvery(SETTINGS_GENERATE_RANDOM_ACCOUNT, generateRandomAccount)
  yield takeEvery(SETTINGS_REMOVE_ACCOUNT, removeAccount)
  yield takeEvery(SETTINGS_RESET, resetSettings)
}
