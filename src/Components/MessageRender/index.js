import React from 'react'
import PropTypes from 'prop-types'
import { FacebookElement, LineElement } from '../../lib/MessageElement'
import { channelTypes } from '../../constants'

const { FACEBOOK, LINE } = channelTypes

const MessageRender = props => {
  const { channel, data } = props
  if (channel === FACEBOOK) {
    return <FacebookElement message={data && data.message} />
  } else if (channel === LINE) {
    return <LineElement message={data && data.message} />
  }
  return null
}

MessageRender.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]).isRequired,
  data: PropTypes.object.isRequired,
}

export default MessageRender
