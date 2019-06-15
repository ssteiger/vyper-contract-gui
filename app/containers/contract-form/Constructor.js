// @flow
import { connect } from 'react-redux'

import Constructor from '../../components/contract-form/Constructor'
import { deployContract } from '../../actions/contractForm'

function mapStateToProps(state) {
  const { selectedFile, accounts } = state
  return {
    file: selectedFile,
    accounts,
  }
}

const mapDispatchToProps = dispatch => ({
  deployContract: (contract) => dispatch(deployContract(contract)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Constructor)
