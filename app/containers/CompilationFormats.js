// @flow
import { connect } from 'react-redux'

import CompilationFormats from '../components/CompilationFormats'

function mapStateToProps(state) {
  return {
    ...state.selectedFile,
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompilationFormats)
