import React from 'react'
import { Divider, Icon } from 'antd'
import QuickReplyForm from './QuickReply'
import BaseMessageForm from '../../BaseMessageForm'
import QuickReplyObject, { Types } from '../../../MessageObject/Line/quickReply'
import { swapArrayElement } from '../../../../utils'
import { Flex, Toolbar } from '../../styled'

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

  validateMessage = () => {
    const { message } = this.state
    const quickReplies = message.quickReply && [...message.quickReply.items]
    return quickReplies.every((quickReply, i) => {
      if (quickReply.imageUrl && quickReply.imageUrl.substr(0, 8) !== 'https://') {
        this.setState({ error: `Quick Reply #${i + 1}: Image url schema must be a https!!` })
        return false
      }
      if (!quickReply.action.label) {
        this.setState({ error: `Quick Reply #${i + 1}: Label is required!!` })
        return false
      }
      if (quickReply.action.label && quickReply.action.label.length > 20) {
        this.setState({
          error: `Quick Reply #${i + 1}: Label must be no longer than 20 characters!!`,
        })
        return false
      }
      if (quickReply.action.type === Types.POSTBACK) {
        if (!quickReply.action.data) {
          this.setState({ error: `Quick Reply #${i + 1}: Postback data is required!!` })
          return false
        }
        if (quickReply.action.data.length > 300) {
          this.setState({ error: `Quick Reply #${i + 1}: Postback data must be no longer than 300 characters!!` })
          return false
        }
        if (!quickReply.action.displayText) {
          this.setState({ error: `Quick Reply #${i + 1}: Postback displayText is required!!` })
          return false
        }
        if (quickReply.action.displayText.length > 300) {
          this.setState({
            error: `Quick Reply #${i + 1}: Postback displayText must be no longer than 300 characters!!`,
          })
          return false
        }
      } else if (quickReply.action.type === Types.MESSAGE) {
        if (!quickReply.action.text) {
          this.setState({ error: `Quick Reply #${i + 1}: Message text is required!!` })
          return false
        }
        if (quickReply.action.text.length > 300) {
          this.setState({ error: `Quick Reply #${i + 1}: Message text must be no longer than 300 characters!!` })
          return false
        }
      } else if (quickReply.action.type === Types.URI) {
        const regEx = /(^https:\/\/|^http:\/\/|^line:\/\/|^tel:\/\/)/g
        if (!quickReply.action.uri) {
          this.setState({ error: `Quick Reply #${i + 1}: URI link is required!!` })
          return false
        }
        if (!regEx.test(quickReply.action.uri)) {
          this.setState({ error: `Quick Reply #${i + 1}: URI link schema must be one of http, https, line, tel!!` })
          return false
        }
        if (quickReply.action.uri.length > 1000) {
          this.setState({ error: `Quick Reply #${i + 1}: URI link must be no longer than 1000 characters!!` })
          return false
        }
      } else if (quickReply.action.type === Types.DATE) {
        if (!quickReply.action.data) {
          this.setState({ error: `Quick Reply #${i + 1}: DatePicker data is required!!` })
          return false
        }
        if (quickReply.action.data.length > 300) {
          this.setState({ error: `Quick Reply #${i + 1}: DatePicker data must be no longer than 300 characters!!` })
          return false
        }
      }
      return true
    })
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
              <Toolbar>
                {i !== 0 && (
                  <Icon type="up-circle" className="primary-icon" onClick={() => this.moveQuickReply(i, 'up')} />
                )}
                {i !== message.quickReply.items.length - 1 && (
                  <Icon type="down-circle" className="primary-icon" onClick={() => this.moveQuickReply(i, 'down')} />
                )}
                {message.quickReply.items.length !== 1 && (
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
        {message.quickReply.items.length < 13 && (
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
