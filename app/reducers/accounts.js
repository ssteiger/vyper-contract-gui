// @flow
import type { Action } from './types'

import {
  WEB3_ACCOUNTS_LOAD_ALL,
  WEB3_ACCOUNTS_SET_MAIN,
  WEB3_ACCOUNTS_LOAD_BALANCES,
} from '../constants/actions'

const initialState = {
  all: [],
  selected: {},
}

export default function accounts(state: Object = initialState, action: Action) {
  switch (action.type) {
    case WEB3_ACCOUNTS_LOAD_ALL:
      return {
        ...state,
        all: action.accounts,
      }
    case WEB3_ACCOUNTS_SET_MAIN:
      return {
        ...state,
        selected: action.account,
      }
    default:
      return {
        ...state
      }
  }
}
