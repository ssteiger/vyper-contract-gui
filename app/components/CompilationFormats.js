// @flow
import React, { Component } from 'react'
import { Input, Typography } from 'antd'

// TODO:
// type Props = {}

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


    const text_area_height = 14
    const style = {
      marginBottom:'10px',
      padding:'10px',
      backgroundColor:'rgb(240, 242, 245)',
    }
    // TODO: reduce code -> itterate over formats
    return (
      <div style={{ marginLeft:'12px' }}>
        <Text strong>content</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={content} />
        </div>
        <Text strong>abi</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={JSON.stringify(abi)} />
        </div>
        <Text strong>method_identifiers</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={JSON.stringify(method_identifiers, null, 4)} />
        </div>
        <Text strong>interface</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={this.props.interface} />
        </div>
        <Text strong>external_interface</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={external_interface} />
        </div>
        <Text strong>source_map</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={JSON.stringify(source_map)} />
        </div>
        <Text strong>ir</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={ir} />
        </div>
        <Text strong>asm</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={asm} />
        </div>
        <Text strong>bytecode</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={bytecode} />
        </div>
        <Text strong>bytecode_runtime</Text>
        <div style={{ ...style }}>
          <TextArea rows={text_area_height} value={bytecode_runtime} />
        </div>
      </div>
    )
  }
}
