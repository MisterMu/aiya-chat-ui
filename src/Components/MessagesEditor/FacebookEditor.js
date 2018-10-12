import React from 'react'
import BaseEditor from './BaseEditor'
import FacebookMessage from '../../lib/MessageElement/Facebook'
import { getFacebookForm } from '../../lib/MessageForm/'
import { getFacebookMessageType } from '../../lib/types'

class FacebookEditor extends BaseEditor {
  renderToolbar = () => {
    return <button onClick={() => {}}>add Text</button>
  }

  render() {
    const { data, editIndex } = this.state
    const type = editIndex !== -1 && getFacebookMessageType(data[editIndex])
    return (
      <div>
        {data.map((message, i) => (
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
