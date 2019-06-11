import { takeEvery } from 'redux-saga/effects'

import {
  SETTINGS_INIT,
  SETTINGS_UPDATE,
  SETTINGS_IMPORT_ACCOUNT,
  SETTINGS_GENERATE_RANDOM_ACCOUNT,
  SETTINGS_REMOVE_ACCOUNT,
} from '../../constants/actions'

import initializeSettings from './initializeSettings'
import updateSettings from './updateSettings'
import importAccountFromPrivateKey from './importAccountFromPrivateKey'
import generateRandomAccount from './generateRandomAccount'
import removeAccount from './removeAccount'

export default function* settingsSaga() {
  yield takeEvery(SETTINGS_INIT, initializeSettings)
  yield takeEvery(SETTINGS_UPDATE, updateSettings)
  yield takeEvery(SETTINGS_IMPORT_ACCOUNT, importAccountFromPrivateKey)
  yield takeEvery(SETTINGS_GENERATE_RANDOM_ACCOUNT, generateRandomAccount)
  yield takeEvery(SETTINGS_REMOVE_ACCOUNT, removeAccount)
}
