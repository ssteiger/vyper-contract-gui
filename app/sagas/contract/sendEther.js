import { call } from 'redux-saga/effects'
import { message } from 'antd'

import { CONTRACT_BALANCES_SET } from '../../constants/actions'

import { sendEtherToContract } from '../../utils'

export default function* sendEther(action) {
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
