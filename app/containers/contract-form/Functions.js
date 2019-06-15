// @flow
import { connect } from 'react-redux'

import Functions from '../../components/contract-form/Functions'
import { callContractFunction } from '../../actions/contractForm'
import { resetFunctionCallResults } from '../../actions/functionCallResults'

function mapStateToProps(state) {
  const { selectedFile, functionCallResults, accounts } = state
  return {
    file: selectedFile,
    functionCallResults,
    accounts,
  }
}

const mapDispatchToProps = dispatch => ({
  callContractFunction: (contract) => dispatch(callContractFunction(contract)),
  resetFunctionCallResults: (functionDetails) => dispatch(resetFunctionCallResults(functionDetails)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Functions)
