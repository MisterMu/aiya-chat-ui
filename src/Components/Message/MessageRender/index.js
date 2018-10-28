import React from 'react'
import PropTypes from 'prop-types'
import { channelTypes } from '../../../constants'
import { FacebookElement, LineElement } from '../../../lib/MessageElement'

const { FACEBOOK, LINE } = channelTypes

const MessageRender = props => {
  const { channel, data, showQuickReplies, elementOnClick, align } = props
  if (channel === FACEBOOK) {
    return (
      <FacebookElement
        message={data && data.message}
        showQuickReplies={showQuickReplies || false}
        elementOnClick={elementOnClick}
        align={align}
      />
    )
  } else if (channel === LINE) {
    return (
      <LineElement
        message={data && data.message}
        showQuickReplies={showQuickReplies || false}
        elementOnClick={elementOnClick}
        align={align}
      />
    )
  }
  return null
}

MessageRender.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]).isRequired,
  data: PropTypes.object.isRequired,
  showQuickReplies: PropTypes.bool,
  elementOnClick: PropTypes.func,
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

export default MessageRender
