// @flow
import {
  CONTRACT_DEPLOY,
  CONTRACT_SELECT_ADDRESS,
  CONTRACT_LOAD_BALANCES,
  CONTRACT_CALL_FUNCTION,
  CONTRACT_SEND_ETHER,
} from '../constants/actions'

const deployContract = (payload: Object) => ({
  type: CONTRACT_DEPLOY,
  payload,
})

const selectAddress = (file: Object, address: String) => ({
  type: CONTRACT_SELECT_ADDRESS,
  payload: {
    file,
    address,
  }
})

const loadContractBalances = (file: Object) => ({
  type: CONTRACT_LOAD_BALANCES,
  file,
})

const callFunction = (payload: Object) => ({
  type: CONTRACT_CALL_FUNCTION,
  payload,
})

const sendEther = (payload: Object) => ({
  type: CONTRACT_SEND_ETHER,
  payload,
})

export {
  deployContract,
  selectAddress,
  loadContractBalances,
  callFunction,
  sendEther,
}
