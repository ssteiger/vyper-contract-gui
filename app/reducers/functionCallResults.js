// @flow
import type { Action } from './types'

import {
  FUNCTION_CALL_RESULTS_UPDATE,
  FUNCTION_CALL_RESULTS_RESET,
} from '../constants/actions'

const initialState = {}

export default function functionCallResults(state: Object = initialState, action: Action) {
  let newState = {
    ...state,
  }
  switch (action.type) {
    case FUNCTION_CALL_RESULTS_UPDATE: {
      const { payload: { functionDetails, result } } = action
      newState[functionDetails.signature] = result + ''
      return newState
    }
    case FUNCTION_CALL_RESULTS_RESET:
      delete newState[action.functionName]
      return newState
    default:
      return {
        ...state,
      }
  }
}
