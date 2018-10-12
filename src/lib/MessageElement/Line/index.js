import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { getLineMessageType } from '../../types'
import TextMessage from './Text'

const { TEXT } = messageTypes

const LineElement = props => {
  const { message } = props
  const type = getLineMessageType(message)
  if (type === TEXT) {
    return <TextMessage text={message.text} />
  }
  return null
}

LineElement.propTypes = {
  message: PropTypes.object,
}

export { TextMessage }

export default LineElement
