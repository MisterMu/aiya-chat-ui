import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'
import { color } from '../../../../constants'

const { LINE } = color

const TextMessage = props => {
  const { text } = props
  return (
    <BubbleMessage color={LINE.bubbleColor} textColor={LINE.textColor}>
      {text}
    </BubbleMessage>
  )
}

TextMessage.propTypes = {
  text: PropTypes.string,
}

export default TextMessage
