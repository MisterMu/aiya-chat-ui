import React from 'react'
import PropTypes from 'prop-types'
import { TextMessage } from '../../MessageElement'
import { getMessageTypeByFacebookMessage, getMessageTypeByLineMessage } from '../../lib/types'
import { channelTypes, messageTypes } from '../../values/enum'

const { FACEBOOK, LINE } = channelTypes
const { TEXT, AUDIO, IMAGE, VIDEO, FILE } = messageTypes

class MessageReader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderTextMessage = (channel, message) => {
    return <TextMessage channel={channel} text={message.text} />
  }

  renderUI = (channel, message) => {
    let messageType = ''
    if (channel === FACEBOOK) {
      messageType = getMessageTypeByFacebookMessage(message)
    } else if (channel === LINE) {
      messageType = getMessageTypeByLineMessage(message)
    }
    switch (messageType) {
      case TEXT:
        return this.renderTextMessage(channel, message)
      case AUDIO:
        return null
      case IMAGE:
        return null
      case VIDEO:
        return null
      case FILE:
        return null
      default:
        return null
    }
  }

  render() {
    const { channel, message } = this.props
    return <div>{this.renderUI(channel, message)}></div>
  }
}

MessageReader.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]),
  message: PropTypes.object,
}

export default MessageReader
