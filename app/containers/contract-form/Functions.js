// @flow
import { connect } from 'react-redux'

import Functions from '../../components/contract-form/Functions'
import { callFunction } from '../../actions/contractForm'
import { resetFunctionCallResults } from '../../actions/functionCallResults'

function mapStateToProps(state) {
  return {
    file: state.selectedFile,
    functionCallResults: state.functionCallResults,
    web3: state.web3,
  }
}

const mapDispatchToProps = dispatch => ({
  callFunction: (contract) => dispatch(callFunction(contract)),
  resetFunctionCallResults: (functionDetails) => dispatch(resetFunctionCallResults(functionDetails)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Functions)
