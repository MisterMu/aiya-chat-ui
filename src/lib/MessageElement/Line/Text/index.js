import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'
import { color } from '../../../../constants'

const { LINE } = color

const TextElement = props => {
  const { text } = props
  return (
    <BubbleMessage color={LINE.bubbleColor} textColor={LINE.textColor}>
      {text}
    </BubbleMessage>
  )
}

TextElement.propTypes = {
  text: PropTypes.string,
}

export default TextElement
