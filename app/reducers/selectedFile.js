// @flow
import type { Action } from './types'

import {
  FILE_SET_SELECTED,
  CONTRACT_DEPLOY,
  CONTRACT_SHOW_NEW_ADDRESS,
  CONTRACT_SELECT_ADDRESS,
  CONTRACT_BALANCES_SET,
  CONTRACT_CALL_FUNCTION,
} from '../constants/actions'

const initialState = {}

export default function selectedFile(state: Object = initialState, action: Action) {
  switch (action.type) {
    case FILE_SET_SELECTED: {
      const { file } = action
      return {
        ...state,
        ...file,
      }
    }
    case CONTRACT_DEPLOY:
      return {
        ...state,
      }
    case CONTRACT_SHOW_NEW_ADDRESS: {
      const { contractAddress } = action
      const address = { address: contractAddress, balance: 0 }
      let deployedAt = {
        addresses: state.deployedAt.addresses.slice(0), // copy array
        selected: { address },
      }
      deployedAt.addresses.push(address)
      return {
        ...state,
        deployedAt,
      }
    }
    case CONTRACT_SELECT_ADDRESS:
      return {
        ...state,
      }
    case CONTRACT_BALANCES_SET:
      return {
        ...state,
        deployedAt: action.deployedAt,
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
