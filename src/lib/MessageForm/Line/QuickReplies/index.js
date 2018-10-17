import React from 'react'
import { Divider, Icon } from 'antd'
import styled from 'styled-components'
import QuickReplyForm from './QuickReply'
import BaseMessageForm from '../../BaseMessageForm'
import QuickReplyObject from '../../../MessageObject/Line/quickReply'
import { swapArrayElement } from '../../../../utils'

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  i {
    cursor: pointer;
    margin-left: 8px;
  }
  .move-icon:hover {
    color: #438ef7;
  }
  .del-icon:hover {
    color: red;
  }
`

class QuickRepliesForm extends BaseMessageForm {
  addQuickReply = () => {
    const { message } = this.state
    if (!message || !message.quickReply || !message.quickReply.items) {
      return null
    }
    const tmp = [...message.quickReply.items, QuickReplyObject.message]
    this.setState({ message: { ...message, quickReply: { items: tmp } } })
  }

  delQuickReply = index => {
    const { message } = this.state
    if (!message || !message.quickReply || !message.quickReply.items) {
      return null
    }
    let tmp = [...message.quickReply.items]
    tmp.splice(index, 1)
    this.setState({ message: { ...message, quickReply: { items: tmp } } })
  }

  moveQuickReply = (index, direction) => {
    const { message } = this.state
    if (!message || !message.quickReply || !message.quickReply.items) {
      return null
    }
    let tmp = [...message.quickReply.items]
    let swapTo = 0
    if (direction === 'up') {
      swapTo = index - 1
    } else if (direction === 'down') {
      swapTo = index + 1
    } else {
      return null
    }
    const newTmp = swapArrayElement([...tmp], index, swapTo)
    this.setState({ message: { ...message, quickReply: { items: newTmp } } })
  }

  inputChange = (item, index) => {
    const { message } = this.state
    if (!message || !message.quickReply || !message.quickReply.items) {
      return null
    }
    let tmp = [...message.quickReply.items]
    const oldData = { ...tmp[index] }
    let newData = []
    if (item.imageUrl != null && item.imageUrl !== oldData.imageUrl) {
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
              <Flex>
                {i !== 0 && (
                  <Icon
                    type="up-circle"
                    className="move-icon"
                    onClick={() => this.moveQuickReply(i, 'up')}
                  />
                )}
                {i !== message.quickReply.items.length - 1 && (
                  <Icon
                    type="down-circle"
                    className="move-icon"
                    onClick={() => this.moveQuickReply(i, 'down')}
                  />
                )}
                {message.quickReply.items.length !== 1 && (
                  <Icon
                    className="del-icon"
                    type="close-circle"
                    theme="filled"
                    onClick={() => this.delQuickReply(i)}
                  />
                )}
              </Flex>
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
