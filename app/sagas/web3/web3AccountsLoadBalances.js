import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { WEB3_ACCOUNTS_LOAD_ALL } from '../../constants/actions'

import { Settings } from '../../datastore'

import {
  promiseDbFind,

  getWeb3,
  web3GetAccountBalance,
} from '../../utils'

export default function* web3AccountsLoadBalances(action) {
  try {
    const settings = yield call(promiseDbFind, Settings, { _id: 'accounts' })
    const { accounts } = settings[0]

    for (let i=0; i<accounts.length; i++) {
      accounts[i].balance = yield call(web3GetAccountBalance, accounts[i].address)
    }

    yield put({ type: WEB3_ACCOUNTS_LOAD_ALL, accounts })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
