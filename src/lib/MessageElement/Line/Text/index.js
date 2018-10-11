import React from 'react'
import PropTypes from 'prop-types'
import { BubbleMessage } from '../../styled'

const TextMessage = props => {
  const { text } = props
  return <BubbleMessage color="green">{text}</BubbleMessage>
}

TextMessage.propTypes = {
  text: PropTypes.string,
}

export default TextMessage
