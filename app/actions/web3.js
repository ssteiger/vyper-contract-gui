// @flow
import {
  WEB3_INIT,
  WEB3_ACCOUNTS_SET_MAIN,
  WEB3_ACCOUNTS_LOAD_BALANCES,
} from '../constants/actions'

const initWeb3 = (payload: Object) => ({
  type: WEB3_INIT,
  payload,
})

const web3AccountsSetMain = (account: Object) => ({
  type: WEB3_ACCOUNTS_SET_MAIN,
  account,
})

const web3AccountsLoadBalances = () => ({
  type: WEB3_ACCOUNTS_LOAD_BALANCES,
})

export {
  initWeb3,
  web3AccountsSetMain,
  web3AccountsLoadBalances,
}
