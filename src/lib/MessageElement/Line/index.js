import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { getLineMessageType } from '../../../utils'
import TextElement from './Text'
import ImageElement from './Image'

const { TEXT, IMAGE } = messageTypes

const LineElement = props => {
  const { message } = props
  const type = getLineMessageType(message)
  switch (type) {
    case TEXT:
      return <TextElement text={message.text} />
    case IMAGE:
      const { originalContentUrl } = message
      return <ImageElement url={originalContentUrl} />
    default:
      return null
  }
}

LineElement.propTypes = {
  message: PropTypes.object,
}

export { TextElement, ImageElement }

export default LineElement
