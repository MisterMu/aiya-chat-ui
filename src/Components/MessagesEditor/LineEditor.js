import React from 'react'
import BaseEditor from './BaseEditor'
import LineMessage from '../../lib/MessageElement/Line'
import { getLineForm } from '../../lib/MessageForm'
import { getLineMessageType } from '../../lib/types'

class LineEditor extends BaseEditor {
  renderToolbar = () => {
    return <button onClick={() => {}}>add Text</button>
  }

  render() {
    const { data, editIndex } = this.state
    const type = editIndex !== -1 && getLineMessageType(data[editIndex])
    return (
      <div>
        {data.map((message, i) => (
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
