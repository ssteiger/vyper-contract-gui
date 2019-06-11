// @flow
import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import ContractForm from '../containers/contract-form'
import CompilationFormats from '../containers/CompilationFormats'

let cron

export default class File extends Component<Props> {

  componentDidUpdate(prevProps) {
    // if the contract file changed that is displayed
    // -> update the cronJob for fetching contractBalances
    if ( !cron || (prevProps.file.path !== this.props.file.path) ) {
      console.log('new file -> updating cron')
      const { file, loadContractBalances } = this.props

      clearInterval(cron)

      // run every x seconds
      const seconds = 8

      cron = setInterval(() => {
        loadContractBalances(file)
      }, seconds*1000)

      loadContractBalances(file)
    }
  }

  render() {
    const { Content } = Layout

    // TODO: dynamically calculate marginTop
    return (
      <Content style={{ margin:'64px 0px 0px', padding:'24px', background:'#fff' }}>
        <Row>
          <Col span={12}>
            <ContractForm />
          </Col>
          <Col span={12}>
            <CompilationFormats />
          </Col>
        </Row>
      </Content>
    )
  }
}
