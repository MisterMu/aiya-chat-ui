import React from 'react'
import PropTypes from 'prop-types'
import FacebookMessage from '../../lib/MessageElement/Facebook'
import LineMessage from '../../lib/MessageElement/Line'
import { channelTypes } from '../../constants'

const { FACEBOOK, LINE } = channelTypes

const MessageRender = props => {
  const { channel, message } = props
  if (channel === FACEBOOK) {
    return <FacebookMessage message={message} />
  } else if (channel === LINE) {
    return <LineMessage message={message} />
  }
  return null
}

MessageRender.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]),
  message: PropTypes.object,
}

export default MessageRender
