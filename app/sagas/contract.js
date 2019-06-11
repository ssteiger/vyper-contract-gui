import { takeEvery, call, put } from 'redux-saga/effects'
import { message } from 'antd'

import {
  CONTRACT_DEPLOY,
  CONTRACT_CALL_FUNCTION,
  CONTRACT_SHOW_NEW_ADDRESS,
  CONTRACT_SELECT_ADDRESS,
  CONTRACT_BALANCES_LOAD,
  CONTRACT_BALANCES_SET,
  CONTRACT_SEND_ETHER,
  FUNCTION_CALL_RESULTS_UPDATE,
  SELECTED_FILE_SET,
  FILES_FETCH_ALL,
} from '../constants/actions'

import { Files } from '../datastore'

import {
  promiseDbFind,
  promiseDbUpdate,
  getWeb3,
  deployContract,
  executeContractFunction,
  sendEtherToContract,
} from '../utils'

export function* deploy(action) {
  try {
    const { file, inputs, account } = action.payload
    const transactionReceipt = yield call(deployContract, file, inputs, account)
    const { contractAddress } = transactionReceipt
    // TODO: hmm, it seems we can't do $push & $set in one go...
    const query_change_1 = {
      $push: { 'deployedAt.addresses': { address: contractAddress } },
    }
    const query_change_2 = {
      $set: { 'deployedAt.selected.address': { address: contractAddress } },
    }

    yield call(promiseDbUpdate, Files, { _id: file._id }, query_change_1)
    yield call(promiseDbUpdate, Files, { _id: file._id }, query_change_2)

    message.success(`deployed contract at ${contractAddress}`)
    yield put({ type: CONTRACT_SHOW_NEW_ADDRESS, contractAddress })
  } catch (e) {
    if (e.message === 'Invalid JSON RPC response: ""') {
      message.error(e.message)
      message.error('Are you sure your connections are healthy?')
    } else {
      console.log(e)
      message.error(e.message)
    }
  }
}

export function* setSelectedAddress(action) {
  const { file, address } = action.payload
  try {
    let query_find = { _id: file._id }
    let query_change = {
      $set: { 'deployedAt.selected': { address } }
    }
    yield call(promiseDbUpdate, Files, query_find, query_change)
    file.deployedAt.selected = { address }
    yield put({ type: SELECTED_FILE_SET, file })
    yield put({ type: FILES_FETCH_ALL })
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* loadContractBalances(action) {
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

export function* sendEther(action) {
  try {
    const { file, ether, account } = action.payload
    const deployedAt = file.deployedAt.selected.address.address
    const result = yield call(sendEtherToContract, file, deployedAt, ether, account)
    message.success('ether sent')
  } catch (e) {
    console.log(e)
    message.error(e.message)
  }
}

export function* callFunction(action) {
  try {
    const { file, functionDetails, inputs, transactionValue, account} = action.payload
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

export function* contractSaga() {
  yield takeEvery(CONTRACT_DEPLOY, deploy)
  yield takeEvery(CONTRACT_SELECT_ADDRESS, setSelectedAddress)
  yield takeEvery(CONTRACT_BALANCES_LOAD, loadContractBalances)
  yield takeEvery(CONTRACT_SEND_ETHER, sendEther)
  yield takeEvery(CONTRACT_CALL_FUNCTION, callFunction)
}
