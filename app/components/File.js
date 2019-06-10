// @flow
import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import ContractForm from '../containers/contract-form'
import CompilationFormats from '../containers/CompilationFormats'

/*

// TODO:
type Props = {
  selectedFile: {
    _id: String,
    name: String,
    path: String,
    lastModified: Number,
    lastModifiedDate: String, // TODO: -> Date?
    size: Number,
    uid: String,
    addedOn: String,
    deployedAt: {
      addresses: Array,
      selected: String,
    },

    content: String,
    abi: Array,
    method_identifiers: Object,
    interface: String,
    external_interface: String,
    bytecode: String,
    bytecode_runtime: String,
    ir: String,
    asm: String,
    source_map: {
      breakpoints: Array,
      pc_pos_map: Object,
    },
  }
}
*/

export default class File extends Component<Props> {

  render() {
    const { Content } = Layout

    // TODO: dynamically calculate marginTop
    return (
      <Content style={{ margin:'64px 0px 0px' }}>
        <div style={{ padding:'24px', background:'#fff' }}>
          <Row>
            <Col span={12}>
              <ContractForm />
            </Col>
            <Col span={12}>
              <CompilationFormats />
            </Col>
          </Row>
        </div>
      </Content>
    )
  }
}
