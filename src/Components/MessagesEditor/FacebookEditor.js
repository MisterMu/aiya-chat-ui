import React from 'react'
import * as Message from '../../lib/MessageElement/Facebook'
import BaseEditor from './BaseEditor'
import TextMessageForm from '../../lib/MessageElement/Facebook/Text/form'

class FacebookEditor extends BaseEditor {
  renderToolbar = () => {
    return (
      <button
        onClick={() =>
          this.addMessage(
            <Message.TextMessage
              message={{ text: 'default message' }}
              onChange={msg => this.updateMessage(msg)}
            />,
          )
        }
      >
        add Text
      </button>
    )
  }

  render() {
    const { data, editIndex } = this.state
    const components = data.map((message, index) => {
      if (message.text) {
        return (
          <div onClick={e => this.startEdit(index)}>
            <Message.TextMessage message={message} />
          </div>
        )
      } else if (message.attachment) {
        if (message.attachment.type === 'image') {
          return <Message.ImageMessage message={message} ref={ref => (this.imagRefs = ref)} />
        }
      }
      return null
    })
    return (
      <div>
        {components.map((message, key) => (
          <React.Fragment key={key}>{message}</React.Fragment>
        ))}
        <div>{this.renderToolbar()}</div>
        <div>
          {this.renderModal(
            <TextMessageForm
              defaultValue={data[editIndex]}
              onSubmit={message => this.updateMessage(message, editIndex)}
            />,
          )}
        </div>
      </div>
    )
  }
}

export default FacebookEditor
