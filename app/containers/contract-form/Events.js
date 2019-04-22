// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Events from '../../components/contract-form/Events'
import * as ContractActions from '../../actions/contractForm'

function mapStateToProps(state) {
  return {
    file: state.selectedFile,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContractActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Events)
