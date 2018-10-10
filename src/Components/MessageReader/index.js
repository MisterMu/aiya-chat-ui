import React from 'react'
import PropTypes from 'prop-types'
import { TextUI } from '../../MessageElement/ui'

class MessageReader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderTextUI = message => {
    return <TextUI text={message.text} />
  }

  renderUI = (channel, message) => {
    if (channel === 'facebook') {
      if (message.text) {
        return this.renderTextUI(message)
      }
    } else if (channel === 'line') {
      if (message.type === 'text') {
        return this.renderTextUI(message)
      }
    }
  }

  render() {
    const { channel, message } = this.props
    return <div>{this.renderUI(channel, message)}</div>
  }
}

MessageReader.propTypes = {
  channel: PropTypes.oneOf(['facebook', 'line']),
  message: PropTypes.object,
}

export default MessageReader
