import React from 'react'
import PropTypes from 'prop-types'
import { FacebookElement, LineElement } from '../../lib/MessageElement'
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
  channel: PropTypes.oneOf([FACEBOOK, LINE]).isRequired,
  message: PropTypes.object.isRequired,
}

export default MessageRender
