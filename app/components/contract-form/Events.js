// @flow
import React, { Component } from 'react'
import { List, Typography } from 'antd'

// TODO:
// type Props = {}

// TODO: implement this
export default class Events extends Component<Props> {
  render() {
    const { Text } = Typography

    const description = (a) => {
      let descriptionString = ''
      a.inputs.forEach((input, key) => {
        descriptionString += `${input.name}: ${input.type}`
        if (key !== a.inputs.length-1) {
          descriptionString += ', '
        }
      })
      return ` (${descriptionString})`
    }

    const { file: { abi } } = this.props

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
            abi.map((a, key) => {
              if (a.type === 'event') {
                return (
                  <List.Item key={`item-${a.name}`}>
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
