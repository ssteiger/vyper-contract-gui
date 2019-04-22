// @flow
import type { Action } from './types'

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

const initialState = {
  show: false,
  rpcServer: 'http://127.0.0.1:7545',
  compilerUrl: 'http://127.0.0.1:8000/compile',
}

export default function settings(state: Object = initialState, action: Action) {
  switch (action.type) {
    case SETTINGS_INIT:
      return {
        ...state,
        ...action.settings,
      }
    case SETTINGS_UPDATE:
      return {
        ...state,
        ...action.settings,
      }
    case SETTINGS_RESET:
      return {
        ...state,
      }
    case SETTINGS_VIEW_SHOW:
      return {
        ...state,
        show: true,
      }
    case SETTINGS_VIEW_HIDE:
      return {
        ...state,
        show: false,
      }
    case SETTINGS_IMPORT_ACCOUNT:
      return {
        ...state,
      }
    case SETTINGS_GENERATE_RANDOM_ACCOUNT:
      return {
        ...state,
      }
    case SETTINGS_REMOVE_ACCOUNT:
      return {
        ...state,
      }
    default:
      return {
        ...state,
      }
  }
}
