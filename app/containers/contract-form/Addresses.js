// @flow
import { connect } from 'react-redux'

import Addresses from '../../components/contract-form/Addresses'
import { selectAddress } from '../../actions/contractForm'

function mapStateToProps(state) {
  const { selectedFile, accounts } = state
  return {
    file: selectedFile,
    accounts,
  }
}

const mapDispatchToProps = dispatch => ({
  selectAddress: (file, address) => dispatch(selectAddress(file, address)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Addresses)
