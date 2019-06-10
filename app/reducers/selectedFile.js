// @flow
import type { Action } from './types'

import {
  SELECTED_FILE_SET,
  CONTRACT_DEPLOY,
  CONTRACT_SELECT_ADDRESS,
  CONTRACT_BALANCES_SET,
  CONTRACT_CALL_FUNCTION,
} from '../constants/actions'

const initialState = {}

export default function selectedFile(state: Object = initialState, action: Action) {
  switch (action.type) {
    case SELECTED_FILE_SET:
      return {
        ...state,
        ...action.file,
      }
    case CONTRACT_DEPLOY:
      return {
        ...state,
      }
    case CONTRACT_SELECT_ADDRESS:
      return {
        ...state,
      }
    case CONTRACT_BALANCES_SET:
      return {
        ...state,
      }
    case CONTRACT_CALL_FUNCTION:
      return {
        ...state,
      }
    default:
      return {
        ...state,
      }
  }
}
