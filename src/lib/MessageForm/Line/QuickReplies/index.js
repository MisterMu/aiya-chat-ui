import React from 'react'
import { Divider, Icon } from 'antd'
import styled from 'styled-components'
import QuickReplyForm from './QuickReply'
import BaseMessageForm from '../../BaseMessageForm'
import QuickReplyObject from '../../../MessageObject/Line/quickReply'

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  i:hover {
    color: red;
    cursor: pointer;
  }
`

class QuickRepliesForm extends BaseMessageForm {
  addQuickReply = () => {
    const { message } = this.state
    if (message && message.quickReply && message.quickReply.items) {
      const tmp = [...message.quickReply.items, QuickReplyObject.message]
      this.setState({ message: { ...message, quickReply: { items: tmp } } })
    }
  }

  delQuickReply = index => {
    const { message } = this.state
    if (message && message.quickReply && message.quickReply.items) {
      let tmp = [...message.quickReply.items]
      tmp.splice(index, 1)
      this.setState({ message: { ...message, quickReply: { items: tmp } } })
    }
  }

  inputChange = (item, index) => {
    const { message } = this.state
    if (message && message.quickReply && message.quickReply.items) {
      let tmp = [...message.quickReply.items]
      const oldData = { ...tmp[index] }
      let newData = []
      if (item.imageUrl && item.imageUrl !== oldData.imageUrl) {
        newData = {
          ...oldData,
          imageUrl: item.imageUrl,
        }
      } else if (item.type && item.type !== oldData.action.type) {
        newData = { ...QuickReplyObject[item.type], imageUrl: oldData.imageUrl }
      } else {
        newData = {
          ...oldData,
          action: {
            ...oldData.action,
            ...item,
          },
        }
      }
      tmp[index] = newData
      this.setState({ message: { ...message, quickReply: { items: tmp } } })
    }
  }

  renderForm = () => {
    const { message } = this.state
    if (!message || !message.quickReply) {
      return null
    }
    return (
      <form onSubmit={this.onSubmit} style={{ paddingLeft: 8, paddingRight: 8 }}>
        {(message.quickReply.items || []).map((quickReply, i) => (
          <React.Fragment key={i}>
            <Flex>
              <Divider orientation="left">Quick Reply #{i + 1}</Divider>
              <Icon
                style={{ marginLeft: 8 }}
                type="close-circle"
                onClick={() => this.delQuickReply(i)}
              />
            </Flex>
            <QuickReplyForm data={quickReply} dataChange={item => this.inputChange(item, i)} />
          </React.Fragment>
        ))}
        <Divider />
        {message.quickReply.items.length < 10 && (
          <Flex style={{ cursor: 'pointer' }} onClick={this.addQuickReply}>
            <Icon type="plus-circle" />
            <span style={{ marginLeft: 8 }}>Add QuickReply</span>
          </Flex>
        )}
      </form>
    )
  }
}

export default QuickRepliesForm
