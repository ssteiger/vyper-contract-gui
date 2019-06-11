// @flow
import { connect } from 'react-redux'

import File from '../components/File'

import { loadContractBalances } from '../actions/contractForm'

function mapStateToProps(state) {
  return {
    file: state.selectedFile,
  }
}

const mapDispatchToProps = dispatch => ({
  loadContractBalances: (file) => dispatch(loadContractBalances(file)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(File)
