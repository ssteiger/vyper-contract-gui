import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { WEB3_INIT } from '../../constants/actions'

import { Settings } from '../../datastore'

import {
  getWeb3,
  promiseDbUpdate,
} from '../../utils'

export default function* importAccountFromPrivateKey(action) {
  try {
    const web3 = yield call(getWeb3)
    const generateAccountFromPKPromise = (privateKey) => {
      return new Promise((resolve, reject) => {
        resolve(web3.eth.accounts.privateKeyToAccount(privateKey))
      })
    }
    const account = yield call(generateAccountFromPKPromise, action.privateKey)
    const query_find = { _id: 'accounts' }
    const query_update = { $push: { accounts: account } }
    yield call(promiseDbUpdate, Settings, query_find, query_update)
    yield put({ type: WEB3_INIT })
    message.success('key imported')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
