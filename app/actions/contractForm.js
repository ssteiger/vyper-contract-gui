// @flow
import {
  CONTRACT_DEPLOY,
  CONTRACT_SELECT_ADDRESS,
  CONTRACT_BALANCES_LOAD,
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
  type: CONTRACT_BALANCES_LOAD,
  file,
})

const callContractFunction = (payload: Object) => ({
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
  callContractFunction,
  sendEther,
}
