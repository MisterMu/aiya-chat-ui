import React from 'react'
import { Divider } from 'antd'
import QuickReplyForm from './QuickReply'
import BaseMessageForm from '../../BaseMessageForm'
import QuickReplyObject from '../../../MessageObject/Line/quickReply'

class QuickRepliesForm extends BaseMessageForm {
  inputChange = (item, index) => {
    const { message } = this.state
    if (message && message.quickReply) {
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
    return (
      <form onSubmit={this.onSubmit} style={{ paddingLeft: 8, paddingRight: 8 }}>
        {message &&
          message.quickReply &&
          (message.quickReply.items || []).map((quickReply, i) => (
            <React.Fragment key={i}>
              <Divider orientation="left">Quick Reply #{i + 1}</Divider>
              <QuickReplyForm data={quickReply} dataChange={item => this.inputChange(item, i)} />
            </React.Fragment>
          ))}
      </form>
    )
  }
}

export default QuickRepliesForm
