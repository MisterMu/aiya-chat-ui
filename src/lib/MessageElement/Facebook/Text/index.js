import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'

const TextMessage = props => {
  const { text } = props
  return <BubbleMessage>{text}</BubbleMessage>
}

TextMessage.propTypes = {
  text: PropTypes.String,
}

export default TextMessage
