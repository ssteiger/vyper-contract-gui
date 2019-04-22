// @flow
import { connect } from 'react-redux'

import Accounts from '../components/Accounts'
import { web3AccountsLoadBalances, web3AccountsSetMain } from '../actions/web3'

function mapStateToProps(state) {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => ({
  web3AccountsLoadBalances: () => dispatch(web3AccountsLoadBalances()),
  web3AccountsSetMain: (account) => dispatch(web3AccountsSetMain(account)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Accounts)
