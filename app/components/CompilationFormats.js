// @flow
import React, { Component } from 'react'
import { Input, Typography } from 'antd'

// TODO:
// type Props = {}

// NOTE: currently this is the main reason for the slow ui renders
export default class CompilationFormats extends Component<Props> {
  render() {
    const { TextArea } = Input
    const { Text } = Typography

    const {
      content,
      abi,
      method_identifiers,
      // interface,
      external_interface,
      source_map,
      ir,
      asm,
      bytecode,
      bytecode_runtime,
    } = this.props

    const styleBox = {
      height:'355px',
      marginBottom:'10px',
      padding:'10px',
      border:'10px rgb(240, 242, 245) solid',
      overflowY:'scroll',
    }
    const styleInner = {
      backgroundColor:'#fff',
      overflowWrap:'break-word',
    }

    // TODO: reduce code -> itterate over formats
    return (
        <div style={{ marginLeft:'12px' }}>
          <Text strong>content</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner, whiteSpace:'pre' }}>
              {content}
            </div>
          </div>
          <Text strong>abi</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner }}>
              {JSON.stringify(abi)}
            </div>
          </div>
          <Text strong>method_identifiers</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner }}>
              {JSON.stringify(method_identifiers, null, 4)}
            </div>
          </div>
          <Text strong>interface</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner, whiteSpace:'pre' }}>
              {this.props.interface}
            </div>
          </div>
          <Text strong>external_interface</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner, whiteSpace:'pre' }}>
              {external_interface}
            </div>
          </div>
          <Text strong>source_map</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner }}>
              {JSON.stringify(source_map)}
            </div>
          </div>
          <Text strong>ir</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner }}>
              {ir}
            </div>
          </div>
          <Text strong>asm</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner }}>
              {asm}
            </div>
          </div>
          <Text strong>bytecode</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner }}>
              {bytecode}
            </div>
          </div>
          <Text strong>bytecode_runtime</Text>
          <div style={{ ...styleBox }}>
            <div style={{ ...styleInner }}>
              {bytecode_runtime}
            </div>
          </div>
        </div>
      )
  }
}
