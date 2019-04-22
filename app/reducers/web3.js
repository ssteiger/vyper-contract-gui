// @flow
import type { Action } from './types'

import {
  WEB3_INIT,
  WEB3_ACCOUNTS_LOAD_ALL,
  WEB3_ACCOUNTS_SET_MAIN,
  WEB3_ACCOUNTS_LOAD_BALANCES,
} from '../constants/actions'

const initialState = {
  accounts: [],
}

export default function web3(state: Object = initialState, action: Action) {
  switch (action.type) {
    case WEB3_INIT:
      return {
        ...state
      }
    case WEB3_ACCOUNTS_LOAD_ALL:
      return {
        ...state,
        accounts: action.accounts,
      }
    case WEB3_ACCOUNTS_SET_MAIN:
      return {
        ...state,
        selectedAccount: action.account,
      }
    case WEB3_ACCOUNTS_LOAD_BALANCES:
      return {
        ...state,
      }
    default:
      return {
        ...state
      }
  }
}
