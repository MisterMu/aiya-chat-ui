import React from 'react'
import { Divider } from 'antd'
import QuickReplyForm from './QuickReply'
import BaseMessageForm from '../../BaseMessageForm'
import QuickReplyObject from '../../../MessageObject/Facebook/quickReply'

class QuickRepliesForm extends BaseMessageForm {
  inputChange = (item, index) => {
    const { message } = this.state
    if (message.quick_replies) {
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
    return (
      <form onSubmit={this.onSubmit} style={{ paddingLeft: 8, paddingRight: 8 }}>
        {message &&
          (message.quick_replies || []).map((quickReply, i) => (
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
