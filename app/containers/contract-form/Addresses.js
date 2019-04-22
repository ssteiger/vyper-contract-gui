// @flow
import { connect } from 'react-redux'

import Addresses from '../../components/contract-form/Addresses'
import { selectAddress, loadContractBalances } from '../../actions/contractForm'

function mapStateToProps(state) {
  return {
    file: state.selectedFile,
    web3: state.web3,
  }
}

const mapDispatchToProps = dispatch => ({
  selectAddress: (file, address) => dispatch(selectAddress(file, address)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Addresses)
