// @flow
import { connect } from 'react-redux'

import Constructor from '../../components/contract-form/Constructor'
import { deployContract } from '../../actions/contractForm'

function mapStateToProps(state) {
  return {
    file: state.selectedFile,
    web3: state.web3,
  }
}

const mapDispatchToProps = dispatch => ({
  deployContract: (contract) => dispatch(deployContract(contract)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Constructor)
