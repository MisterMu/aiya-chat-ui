import React from 'react'
import BaseEditor from './BaseEditor'
import LineMessage from '../../lib/MessageElement/Line'
import { getLineForm } from '../../lib/MessageForm'
import { getLineMessageType } from '../../lib/types'
import { getLineMessage } from '../../lib/messages'
import { messageTypes } from '../../constants'

const { TEXT, AUDIO, IMAGE, VIDEO } = messageTypes

class LineEditor extends BaseEditor {
  avaliableType = [TEXT, AUDIO, IMAGE, VIDEO]

  addBtnClicked = type => {
    const newMsg = getLineMessage(type)
    this.addMessage(newMsg)
  }

  render() {
    const { messages, editIndex } = this.state
    const type = editIndex !== -1 && getLineMessageType(messages[editIndex])
    return (
      <div>
        {messages.map((message, i) => (
          <div key={i} onClick={() => this.startEdit(i)}>
            <LineMessage message={message} />
          </div>
        ))}
        {this.renderToolbar()}
        {this.renderModal(getLineForm(type))}
      </div>
    )
  }
}

export default LineEditor
