import React from 'react'
import { Divider, Icon } from 'antd'
import styled from 'styled-components'
import QuickReplyForm from './QuickReply'
import BaseMessageForm from '../../BaseMessageForm'
import QuickReplyObject from '../../../MessageObject/Facebook/quickReply'

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
    if (message && message.quick_replies) {
      const tmp = [...message.quick_replies, QuickReplyObject.text]
      this.setState({ message: { ...message, quick_replies: tmp } })
    }
  }

  delQuickReply = index => {
    const { message } = this.state
    if (message && message.quick_replies) {
      let tmp = [...message.quick_replies]
      tmp.splice(index, 1)
      this.setState({ message: { ...message, quick_replies: tmp } })
    }
  }

  inputChange = (item, index) => {
    const { message } = this.state
    if (message && message.quick_replies) {
      let tmp = [...message.quick_replies]
      const oldData = { ...tmp[index] }
      if (item.content_type && item.content_type !== oldData.content_type) {
        tmp[index] = QuickReplyObject[item.content_type]
      } else {
        tmp[index] = { ...oldData, ...item }
      }
      this.setState({ message: { ...message, quick_replies: tmp } })
    }
  }

  renderForm = () => {
    const { message } = this.state
    if (!message) {
      return null
    }

    return (
      <form onSubmit={this.onSubmit} style={{ paddingLeft: 8, paddingRight: 8 }}>
        {(message.quick_replies || []).map((quickReply, i) => (
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
        {message.quick_replies.length < 10 && (
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
