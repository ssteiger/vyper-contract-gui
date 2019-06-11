import { call, put } from 'redux-saga/effects'
import { message } from 'antd'

import { CONTRACT_SHOW_NEW_ADDRESS } from '../../constants/actions'

import { Files } from '../../datastore'

import {
  promiseDbUpdate,
  deployContract,
} from '../../utils'

export default function* deploy(action) {
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
