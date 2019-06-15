// @flow
import React, { Component } from 'react'
import { Layout, Row, Form, Input, List, Typography, Button, } from 'antd'

// TODO:
// type Props = {}

export default class Sidebar extends Component<Props> {

  handleEndpointsSubmit = () => (event) =>  {
    event.preventDefault()
    const { updateSettings } = this.props
    const formInputFields = $(event.target).find('input')

    let inputValues = {}
    formInputFields.each((index, item) => {
      inputValues[item.name] = item.value
    })
    updateSettings(inputValues)
  }

  handleAccountSubmit = () => (event) =>  {
    event.preventDefault()
    const { importAccount } = this.props
    let formInputFields = $(event.target).find('input')

    let inputValues = {}
    formInputFields.each((index, item) => {
      inputValues[item.name] = item.value
    })

    if (!inputValues.privateKey.startsWith('0x')) {
      inputValues.privateKey = `0x${inputValues.privateKey}`
    }

    importAccount(inputValues.privateKey)
  }

  render() {
    const { Header, Content, } = Layout
    const { Title } = Typography
    const {
      accounts: { all: allAccounts=[], selected: selectedAccount={} },
      sidebarWidth,
      rpcServer,
      compilerUrl,
      generateRandomAccount,
      removeAccount,
    } = this.props

    return (
      <React.Fragment>
        <Header style={{
          position:'fixed',
          height:'auto',
          width:'calc(100% - 200px)',
          paddingLeft:sidebarWidth,
          padding:'10px 24px',
          background:'#fff',
          borderBottom:'1px solid rgb(232, 232, 232)',
          zIndex:10,
        }}>
          <Row>
            <Title level={4} style={{ marginTop:'15px', marginRight:'24px' }}>Settings</Title>
          </Row>
        </Header>
        <Content style={{
          minHeight:'100vh',
          marginTop:'74px',
          padding:'24px',
          paddingBottom:'150px',
          backgroundColor:'#fff',
        }}>
          <Form
            key='form-settings'
            onSubmit={this.handleEndpointsSubmit()}
            name='settings'
          >
            <Form.Item label='RPC-Server' help='The Ethereum network to connect to.'>
              <Input
                key='input-settings-rpcServer'
                name='rpcServer'
                placeholder='http://127.0.0.1:7545'
                defaultValue={rpcServer}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label='Compiler URL' help='The endpoint where vyper files get sent to, to be compiled.'>
              <Input
                key='input-settings-compilerUrl'
                name='compilerUrl'
                placeholder='http://127.0.0.1:8000/compile'
                defaultValue={compilerUrl}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Button block htmlType='submit'>save settings</Button>
          </Form>
          <List
            size='small'
            header={<b>Accounts</b>}
            //footer={<div>Footer</div>}
            bordered
            style={{ backgroundColor:'#fff', marginTop:'100px' }}
          >
          {
            allAccounts.map((account, key) => {
              return (
                <List.Item key={`item-${key}`} actions={[<a onClick={() => {removeAccount(account)}}>remove</a>]}>
                  <List.Item.Meta
                    //avatar={<Avatar src="https://....png" />}
                    title={account.address}
                    description={account.privateKey}
                  />
                </List.Item>
              )
            })
          }
          </List>
          <Form
            key='new-account'
            onSubmit={this.handleAccountSubmit()}
            name='privateKey'
          >
            <Form.Item help='Enter a private key to import an account'>
              <Input
                key='input-new-account-privatekey'
                name='privateKey'
                placeholder='c1003a9bc811a30721ea2...'
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Button block htmlType='submit'>import account</Button>
          </Form>
          <Button
            block
            type='dashed'
            onClick={() => { generateRandomAccount() }}
            style={{ marginTop: '10px' }}
          >
            generate random account
          </Button>
        </Content>
      </React.Fragment>
    )
  }
}
