import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { WEB3_INIT } from '../../constants/actions'

import { Settings } from '../../datastore'

import {
  getWeb3,
  promiseDbUpdate,
} from '../../utils'

export default function* generateRandomAccount(action) {
  try {
    const web3 = yield call(getWeb3)
    const generateRandomAccountPromise = () => {
      return new Promise((resolve, reject) => {
        // TODO: create 'real' entropy
        const entropy = '+++'
        resolve(web3.eth.accounts.create(entropy))
      })
    }
    const account = yield call(generateRandomAccountPromise)
    const query_find = { _id: 'accounts' }
    const query_update = { $push: { accounts: account } }
    yield call(promiseDbUpdate, Settings, query_find, query_update)
    yield put({ type: WEB3_INIT })
    message.success('account created')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
