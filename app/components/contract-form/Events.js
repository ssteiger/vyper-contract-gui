// @flow
import React, { Component } from 'react'
import { List, Input, Typography } from 'antd'

// TODO:
// type Props = {}

export default class Events extends Component<Props> {
  render() {
    const { Text } = Typography

    function description(a) {
      let description = ''
      a.inputs.forEach(function (input, key) {
        description += input.name + ': ' + input.type
        if (key !== a.inputs.length-1) {
          description += ', '
        }
      })
      return ' (' + description + ')'
    }

    const { abi } = this.props.file

    return (
      <React.Fragment>
        <Text strong>events</Text>
        <div style={{ marginBottom:'10px', padding:'10px', backgroundColor:'rgb(240, 242, 245)' }}>
          <List
            size='small'
            //header={<div>Header</div>}
            //footer={<div>Footer</div>}
            bordered
            style={{ backgroundColor:'#fff' }}
          >
          {
            abi.map(function (a, key) {
              if (a.type == 'event') {
                return (
                  <List.Item key={`item-${key}`}>
                    {a.name}: {description(a)}
                  </List.Item>
                )
              }
            })
          }
          </List>
        </div>
      </React.Fragment>
    )
  }
}
