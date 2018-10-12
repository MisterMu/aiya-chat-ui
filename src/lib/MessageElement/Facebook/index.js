import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { getFacebookMessageType } from '../../types'
import TextMessage from './Text'

const { TEXT } = messageTypes

const FacebookMessage = props => {
  const { message } = props
  const type = getFacebookMessageType(message)
  if (type === TEXT) {
    return <TextMessage text={message.text} />
  }
  return null
}

FacebookMessage.propTypes = {
  message: PropTypes.object,
}

export { TextMessage }

export default FacebookMessage
