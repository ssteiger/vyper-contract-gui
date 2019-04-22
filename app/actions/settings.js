// @flow
import {
  SETTINGS_INIT,
  SETTINGS_UPDATE,
  SETTINGS_RESET,
  SETTINGS_VIEW_SHOW,
  SETTINGS_VIEW_HIDE,
  SETTINGS_IMPORT_ACCOUNT,
  SETTINGS_GENERATE_RANDOM_ACCOUNT,
  SETTINGS_REMOVE_ACCOUNT,
} from '../constants/actions'

const initializeSettings = () => ({
  type: SETTINGS_INIT,
})

const updateSettings = (settings: Object) => ({
  type: SETTINGS_UPDATE,
  settings,
})

const resetSettings = (settings: Object) => ({
  type: SETTINGS_RESET,
  settings,
})

const showSettings = () => ({
  type: SETTINGS_VIEW_SHOW,
})

const hideSettings = () => ({
  type: SETTINGS_VIEW_HIDE,
})

const importAccount = (privateKey: String) => ({
  type: SETTINGS_IMPORT_ACCOUNT,
  privateKey,
})

const generateRandomAccount = () => ({
  type: SETTINGS_GENERATE_RANDOM_ACCOUNT,
})

const removeAccount = (account: Object) => ({
  type: SETTINGS_REMOVE_ACCOUNT,
  account,
})

export {
  initializeSettings,
  updateSettings,
  resetSettings,
  showSettings,
  hideSettings,
  importAccount,
  generateRandomAccount,
  removeAccount,
}
