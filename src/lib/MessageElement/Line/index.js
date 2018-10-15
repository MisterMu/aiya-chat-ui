import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { getLineMessageType } from '../../../utils'
import TextMessage from './Text'
import ImageMessage from './Image'

const { TEXT, IMAGE } = messageTypes

const LineElement = props => {
  const { message } = props
  const type = getLineMessageType(message)
  switch (type) {
    case TEXT:
      return <TextMessage text={message.text} />
    case IMAGE:
      const { originalContentUrl } = message
      return <ImageMessage url={originalContentUrl} />
    default:
      return null
  }
}

LineElement.propTypes = {
  message: PropTypes.object,
}

export { TextMessage, ImageMessage }

export default LineElement
