import React from 'react'
import { Divider, Icon } from 'antd'
import QuickReplyForm from './QuickReply'
import BaseMessageForm from '../../BaseMessageForm'
import QuickReplyObject, { Types } from '../../../MessageObject/Facebook/quickReply'
import { swapArrayElement } from '../../../../utils'
import { Flex, Toolbar } from '../../styled'

class QuickRepliesForm extends BaseMessageForm {
  addQuickReply = () => {
    const { message } = this.state
    if (!message || !message.quick_replies) {
      return null
    }

    const tmp = [...message.quick_replies, QuickReplyObject.text]
    this.setState({ message: { ...message, quick_replies: tmp } })
  }

  delQuickReply = index => {
    const { message } = this.state
    if (!message || !message.quick_replies) {
      return null
    }

    let tmp = [...message.quick_replies]
    tmp.splice(index, 1)
    this.setState({ message: { ...message, quick_replies: tmp } })
  }

  moveQuickReply = (index, direction) => {
    const { message } = this.state
    if (!message || !message.quick_replies) {
      return null
    }
    let tmp = [...message.quick_replies]
    let swapTo = 0
    if (direction === 'up') {
      swapTo = index - 1
    } else if (direction === 'down') {
      swapTo = index + 1
    } else {
      return null
    }
    const newTmp = swapArrayElement([...tmp], index, swapTo)
    this.setState({ message: { ...message, quick_replies: newTmp } })
  }

  inputChange = (item, index) => {
    const { message } = this.state
    if (!message || !message.quick_replies) {
      return null
    }
    let tmp = [...message.quick_replies]
    const oldData = { ...tmp[index] }
    if (item.content_type && item.content_type !== oldData.content_type) {
      tmp[index] = QuickReplyObject[item.content_type]
    } else {
      tmp[index] = { ...oldData, ...item }
    }
    this.setState({ message: { ...message, quick_replies: tmp } })
  }

  validateMessage = () => {
    const { message } = this.state
    const quickReplies = message.quick_replies && [...message.quick_replies]
    return quickReplies.every((quickReply, i) => {
      if (quickReply.content_type === Types.TEXT && !quickReply.title) {
        this.setState({ error: `Quick Reply #${i + 1}: Title must not be empty!!` })
        return false
      }
      if (quickReply.payload && quickReply.payload.length > 1000) {
        this.setState({
          error: `Quick Reply #${i + 1}: Payload must be no longer than 1000 characters!!`,
        })
        return false
      }
      return true
    })
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
              <Toolbar>
                {i !== 0 && (
                  <Icon type="up-circle" className="primary-icon" onClick={() => this.moveQuickReply(i, 'up')} />
                )}
                {i !== message.quick_replies.length - 1 && (
                  <Icon type="down-circle" className="primary-icon" onClick={() => this.moveQuickReply(i, 'down')} />
                )}
                {message.quick_replies.length !== 1 && (
                  <Icon
                    type="close-circle"
                    className="danger-icon"
                    theme="filled"
                    onClick={() => this.delQuickReply(i)}
                  />
                )}
              </Toolbar>
            </Flex>
            <QuickReplyForm
              data={quickReply}
              dataChange={item => this.inputChange(item, i)}
              uploadFile={this.uploadFile}
            />
          </React.Fragment>
        ))}
        <Divider />
        {message.quick_replies.length < 11 && (
          <Flex style={{ cursor: 'pointer', justifyContent: 'center' }} onClick={this.addQuickReply}>
            <Icon type="plus-circle" />
            <span style={{ marginLeft: 8 }}>Add QuickReply</span>
          </Flex>
        )}
      </form>
    )
  }
}

export default QuickRepliesForm
