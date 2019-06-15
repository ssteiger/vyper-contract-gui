import { takeEvery } from 'redux-saga/effects'

import {
  CONTRACT_DEPLOY,
  CONTRACT_SELECT_ADDRESS,
  CONTRACT_BALANCES_LOAD,
  CONTRACT_SEND_ETHER,
  CONTRACT_CALL_FUNCTION,
} from '../../constants/actions'

import deploy from './deploy'
import setSelectedAddress from './setSelectedAddress'
import loadContractBalances from './loadContractBalances'
import sendEther from './sendEther'
import callContractFunction from './callContractFunction'

export default function* contractSaga() {
  yield takeEvery(CONTRACT_DEPLOY, deploy)
  yield takeEvery(CONTRACT_SELECT_ADDRESS, setSelectedAddress)
  yield takeEvery(CONTRACT_BALANCES_LOAD, loadContractBalances)
  yield takeEvery(CONTRACT_SEND_ETHER, sendEther)
  yield takeEvery(CONTRACT_CALL_FUNCTION, callContractFunction)
}
