import React from 'react'
import PropTypes from 'prop-types'
import FacebookElement from '../../lib/MessageElement/Facebook'
import LineElement from '../../lib/MessageElement/Line'
import { channelTypes } from '../../constants'

const { FACEBOOK, LINE } = channelTypes

const MessageRender = props => {
  const { channel, message } = props
  if (channel === FACEBOOK) {
    return <FacebookElement message={message} />
  } else if (channel === LINE) {
    return <LineElement message={message} />
  }
  return null
}

MessageRender.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]),
  message: PropTypes.object,
}

export default MessageRender
