import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'
import { color } from '../../../../constants'

const { FACEBOOK } = color

const TextElement = props => {
  const { text } = props
  return (
    <BubbleMessage color={FACEBOOK.bubbleColor} textColor={FACEBOOK.textColor}>
      {text}
    </BubbleMessage>
  )
}

TextElement.propTypes = {
  text: PropTypes.string,
}

export default TextElement
