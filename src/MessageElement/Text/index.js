import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../styled'
import { channelTypes } from '../../values/enum'

const { FACEBOOK, LINE } = channelTypes

const TextMessage = props => {
  const { text, channel } = props
  if (channel === FACEBOOK) {
    return <BubbleMessage>{text}</BubbleMessage>
  } else if (channel === LINE) {
    return <BubbleMessage>{text}</BubbleMessage>
  } else {
    return null
  }
}

TextMessage.propTypes = {
  text: PropTypes.string,
  channel: PropTypes.string,
}

export default TextMessage
