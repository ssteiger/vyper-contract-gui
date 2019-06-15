// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContractForm from '../../components/contract-form'
import * as ContractActions from '../../actions/contractForm'

function mapStateToProps(state) {
  const { selectedFile, functionCallResults } = state
  return {
    file: selectedFile,
    functionCallResults,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContractActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContractForm)
