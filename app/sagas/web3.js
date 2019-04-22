import { call, put, take, takeEvery } from 'redux-saga/effects'
import { message } from 'antd'

import {
  SELECTED_FILE_SET,
  WEB3_INIT,
  WEB3_ACCOUNTS_LOAD_ALL,
  WEB3_ACCOUNTS_LOAD_BALANCES,
  WEB3_ACCOUNTS_SET_MAIN,
} from '../constants/actions'

import { Settings } from '../datastore'

import {
  promiseDbInsert,
  promiseDbFind,
  promiseDbUpdate,

  getWeb3,
  web3GenerateNewAccounts,
  web3GetAccountBalance,
} from '../utils'

export function* initWeb3(action) {
  try {
    const web3 = yield call(getWeb3)
    let settings = yield call(promiseDbFind, Settings, { _id: 'accounts' })
    let accounts = []
    if (!settings[0] || settings[0].accounts.length == 0) {
      let wallets = yield call(web3GenerateNewAccounts)
      for (let i=0; i<wallets.length; i++) {
        delete wallets[i].index
        accounts.push(wallet[i])
      }
      yield call(promiseDbInsert, Settings, { _id: 'accounts', accounts: accounts })
    } else {
      accounts = settings[0].accounts
    }

    for (let i=0; i<accounts.length; i++) {
      accounts[i].balance = yield call(web3GetAccountBalance, accounts[i].address)
    }
    yield put({ type: WEB3_ACCOUNTS_LOAD_ALL, accounts: accounts })
    yield put({ type: WEB3_ACCOUNTS_SET_MAIN, account: accounts[0] })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* web3AccountsLoadBalances(action) {
  try {
    const web3 = yield call(getWeb3)
    const settings = yield call(promiseDbFind, Settings, { _id: 'accounts' })
    let accounts = settings[0].accounts

    for (let i=0; i<accounts.length; i++) {
      accounts[i].balance = yield call(web3GetAccountBalance, accounts[i].address)
    }

    yield put({ type: WEB3_ACCOUNTS_LOAD_ALL, accounts: accounts })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* web3Saga() {
  yield takeEvery(WEB3_INIT, initWeb3)
  yield takeEvery(WEB3_ACCOUNTS_LOAD_BALANCES, web3AccountsLoadBalances)
  yield takeEvery(SELECTED_FILE_SET, web3AccountsLoadBalances)
}
