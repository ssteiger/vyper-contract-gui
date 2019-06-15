import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { FUNCTION_CALL_RESULTS_UPDATE } from '../../constants/actions'

import { executeContractFunction } from '../../utils'

export default function* callContractFunction(action) {
  try {
    const {
      file,
      functionDetails,
      inputs,
      transactionValue,
      account,
    } = action.payload

    const deployedAt = file.deployedAt.selected.address

    const result = yield call(
      executeContractFunction,
      file,
      deployedAt.address,
      functionDetails,
      inputs,
      transactionValue,
      account,
    )

    const payload = {
      result,
      functionDetails,
    }
    message.success('call executed')
    yield put({ type: FUNCTION_CALL_RESULTS_UPDATE, payload })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
