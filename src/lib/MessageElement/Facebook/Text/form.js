import React from 'react'
import { Input } from 'antd'
import { BaseMessageForm } from '../../shared'

class TextMessageForm extends BaseMessageForm {
  render() {
    const { text } = this.state.message
    return (
      <form onSubmit={this.onSubmit}>
        <div>asd</div>
        <Input
          value={text}
          onChange={e => this.inputChange('text', e.target.value)}
          onPressEnter={() => console.log('asd')}
        />
      </form>
    )
  }
}

TextMessageForm.propTypes = {
  ...BaseMessageForm.propTypes,
}

export default TextMessageForm
