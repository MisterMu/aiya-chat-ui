import React from 'react'
import BaseEditor from './BaseEditor'
import FacebookMessage from '../../lib/MessageElement/Facebook'
import { getFacebookForm } from '../../lib/MessageForm/'
import { getFacebookMessageType } from '../../lib/types'
import { getFacebookMessage } from '../../lib/messages'
import { messageTypes } from '../../constants'

const { TEXT } = messageTypes

class FacebookEditor extends BaseEditor {
  addBtnClicked = type => {
    const newMsg = getFacebookMessage(type)
    this.addMessage(newMsg)
  }

  renderToolbar = () => {
    return <button onClick={() => this.addBtnClicked(TEXT)}>add Text</button>
  }

  render() {
    const { messages, editIndex } = this.state
    const type = editIndex !== -1 && getFacebookMessageType(messages[editIndex])
    return (
      <div>
        {messages.map((message, i) => (
          <div key={i} onClick={() => this.startEdit(i)}>
            <FacebookMessage message={message} />
          </div>
        ))}
        {this.renderToolbar()}
        {this.renderModal(getFacebookForm(type))}
      </div>
    )
  }
}

export default FacebookEditor
