import React from 'react'
import { BaseMessage } from '../../shared'
import { BubbleMessage } from '../../styled'

// const TextMessage = props => {
//   const { text } = props
//   return <BubbleMessage>{text}</BubbleMessage>
// }

class TextMessage extends BaseMessage {
  renderUI = () => {
    const { message } = this.props
    return <BubbleMessage>{message.text}</BubbleMessage>
  }
}

TextMessage.propTypes = {
  ...BaseMessage.propTypes,
}

export default TextMessage
