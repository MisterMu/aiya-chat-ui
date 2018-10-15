import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { getFacebookMessageType } from '../../../utils'
import TextMessage from './Text'
import ImageMessage from './Image'

const { TEXT, IMAGE } = messageTypes

const FacebookElement = props => {
  const { message } = props
  const type = getFacebookMessageType(message)
  switch (type) {
    case TEXT:
      return <TextMessage text={message.text} />
    case IMAGE:
      const { payload } = message.attachment
      return <ImageMessage url={payload.url} />
    default:
      return null
  }
}

FacebookElement.propTypes = {
  message: PropTypes.object,
}

export { TextMessage, ImageMessage }

export default FacebookElement
