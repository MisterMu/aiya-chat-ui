import React from 'react'
import BaseEditor from './BaseEditor'
import FacebookMessage from '../../lib/MessageElement/Facebook'
import TextMessageForm from '../../lib/MessageElement/Facebook/Text/form'

class FacebookEditor extends BaseEditor {
  renderToolbar = () => {
    return <button onClick={() => {}}>add Text</button>
  }

  render() {
    const { data, editIndex } = this.state
    return (
      <div>
        {data.map((message, i) => (
          <div key={i} onClick={() => this.startEdit(i)}>
            <FacebookMessage message={message} />
          </div>
        ))}
        {this.renderToolbar()}
        {this.renderModal(
          <TextMessageForm
            defaultValue={data[editIndex]}
            onSubmit={message => this.updateMessage(message, editIndex)}
          />,
        )}
      </div>
    )
  }
}

export default FacebookEditor
