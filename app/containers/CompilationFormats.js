// @flow
import { connect } from 'react-redux'

import CompilationFormats from '../components/CompilationFormats'

function mapStateToProps(state) {
  const { selectedFile } = state
  return {
    ...selectedFile,
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompilationFormats)
