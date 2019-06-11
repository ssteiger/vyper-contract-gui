import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import {
  WEB3_ACCOUNTS_LOAD_ALL,
  WEB3_ACCOUNTS_SET_MAIN,
} from '../../constants/actions'

import { Settings } from '../../datastore'

import {
  promiseDbInsert,
  promiseDbFind,

  getWeb3,
  web3GetAccountBalance,
} from '../../utils'

export default function* initWeb3(action) {
  try {
    console.log('initWeb3')
    const settings = yield call(promiseDbFind, Settings, { _id: 'accounts' })
    let accounts = []
    if (!settings[0] || settings[0].accounts.length === 0) {
      const web3 = yield call(getWeb3)
      const generateRandomAccountPromise = () => {
        return new Promise((resolve, reject) => {
          // TODO: create 'real' entropy
          const entropy = '54674321§3456544±±±§±±±!!!43534534534534'
          resolve(web3.eth.accounts.create(entropy))
        })
      }
      const account = yield call(generateRandomAccountPromise)
      accounts = [account]
      // TODO: this is not correct, -> insert or update depending on which 'or' in if-condition driggered
      yield call(promiseDbInsert, Settings, { _id: 'accounts', accounts })
    } else {
      accounts = settings[0].accounts
    }

    for (let i=0; i<accounts.length; i++) {
      accounts[i].balance = yield call(web3GetAccountBalance, accounts[i].address)
    }
    yield put({ type: WEB3_ACCOUNTS_LOAD_ALL, accounts })
    yield put({ type: WEB3_ACCOUNTS_SET_MAIN, account: accounts[0] })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
