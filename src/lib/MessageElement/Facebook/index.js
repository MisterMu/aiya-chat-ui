import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { BubbleContainer, MessageContainer } from '../styled'
import TextElement from './Text'
import ImageElement from './Image'
import AudioElement from './Audio'
import QuickRepliesElement from './QuickReplies'

const { TEXT, IMAGE, AUDIO, QUICKREPLIES } = messageTypes

const FacebookElement = props => {
  const { message, showQuickReplies, elementOnClick, align } = props
  if (!message) {
    return null
  }

  let messageElements = []
  if (message.text) {
    messageElements = [<TextElement text={message.text} onClick={elementOnClick && (() => elementOnClick(TEXT))} />]
  } else if (message.attachment) {
    const attachmentType = message.attachment.type
    if (attachmentType === 'image') {
      const { payload } = message.attachment
      const url = payload && payload.url
      messageElements = [<ImageElement url={url || ''} onClick={elementOnClick && (() => elementOnClick(IMAGE))} />]
    } else if (attachmentType === 'audio') {
      const { payload } = message.attachment
      const url = payload && payload.url
      messageElements = [<AudioElement url={url} onClick={elementOnClick && (() => elementOnClick(AUDIO))} />]
    } else {
      return null
    }
  } else {
    return null
  }

  if (showQuickReplies && message.quick_replies) {
    messageElements = [
      ...messageElements,
      <QuickRepliesElement
        quickReplies={message.quick_replies}
        onClick={elementOnClick && (() => elementOnClick(QUICKREPLIES))}
      />,
    ]
  }

  return (
    <MessageContainer>
      {messageElements.map((el, key) => (
        <BubbleContainer align={align || 'left'} key={key}>
          {el}
        </BubbleContainer>
      ))}
    </MessageContainer>
  )
}

FacebookElement.propTypes = {
  message: PropTypes.object,
  showQuickReplies: PropTypes.bool,
  elementOnClick: PropTypes.func,
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

export { TextElement, ImageElement }

export default FacebookElement
