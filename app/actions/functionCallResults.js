// @flow
import {
  FUNCTION_CALL_RESULTS_UPDATE,
  FUNCTION_CALL_RESULTS_RESET,
} from '../constants/actions'

const updateFunctionCallResults = (payload: Object) => ({
  type: FUNCTION_CALL_RESULTS_UPDATE,
  payload,
})

const resetFunctionCallResults = (functionName: String) => ({
  type: FUNCTION_CALL_RESULTS_RESET,
  functionName,
})

export {
  updateFunctionCallResults,
  resetFunctionCallResults,
}
