import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import {
  CONTRACT_BALANCES_SET,
} from '../../constants/actions'

import { Files } from '../../datastore'

import {
  getWeb3,
  promiseDbFind,
  promiseDbUpdate,
} from '../../utils'

export default function* loadContractBalances(action) {
  // NOTE: cron job does not update when a new address is deployed
  //       need to fetch updated file from db
  try {
    const web3 = yield call(getWeb3)
    const files = yield call(promiseDbFind, Files, { path: action.file.path })
    const file = files[0]

    function getAddressBalancePromise(address) {
      return new Promise(function(resolve, reject) {
        resolve(web3.eth.getBalance(address))
      })
    }
    let { deployedAt } = file
    for (let i=0; i<deployedAt.addresses.length; i++) {
      if (deployedAt.addresses[i]) {
        // get current balance
        const balance = yield call(getAddressBalancePromise, deployedAt.addresses[i].address)
        // save balance
        deployedAt.addresses[i].balance = balance
        // save balance in currently selected address
        if (deployedAt.selected.address.address == deployedAt.addresses[i].address) {
          deployedAt.selected.address.balance = balance
        }
      }
    }
    yield put({ type: CONTRACT_BALANCES_SET, deployedAt })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}
