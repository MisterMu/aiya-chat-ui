import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { getFacebookMessageType } from '../../../utils'
import TextElement from './Text'
import ImageElement from './Image'

const { TEXT, IMAGE } = messageTypes

const FacebookElement = props => {
  const { message } = props
  const type = getFacebookMessageType(message)
  switch (type) {
    case TEXT:
      return <TextElement text={message.text} />
    case IMAGE:
      const { payload } = message.attachment
      return <ImageElement url={payload.url} />
    default:
      return null
  }
}

FacebookElement.propTypes = {
  message: PropTypes.object,
}

export { TextElement, ImageElement }

export default FacebookElement
