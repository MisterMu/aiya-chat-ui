import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'
import { color } from '../../../../constants'

const { LINE } = color

const TextElement = props => {
  const { text, onClick } = props
  return (
    <BubbleMessage color={LINE.bubbleColor} textColor={LINE.textColor} onClick={onClick}>
      {text}
    </BubbleMessage>
  )
}

TextElement.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default TextElement
