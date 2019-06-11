import { takeEvery } from 'redux-saga/effects'

import {
  WEB3_INIT,
  WEB3_ACCOUNTS_LOAD_BALANCES,
} from '../../constants/actions'

import initWeb3 from './initWeb3'
import web3AccountsLoadBalances from './web3AccountsLoadBalances'

export default function* web3Saga() {
  yield takeEvery(WEB3_INIT, initWeb3)
  yield takeEvery(WEB3_ACCOUNTS_LOAD_BALANCES, web3AccountsLoadBalances)
}
