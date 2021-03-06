import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { BubbleContainer, MessageContainer } from '../styled'
import TextElement from './Text'
import ImageElement from './Image'
import AudioElement from './Audio'
import QuickRepliesElement from './QuickReplies'
import TemplateElement from './Templates'
import CustomElement from './Custom'

const { TEXT, IMAGE, AUDIO, QUICKREPLIES, TEMPLATES, CUSTOM } = messageTypes

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
    } else if (attachmentType === 'template') {
      const { payload } = message.attachment
      messageElements = [
        <TemplateElement payload={payload} onClick={elementOnClick && (() => elementOnClick(TEMPLATES))} />,
      ]
    }
  }

  if (messageElements.length === 0) {
    messageElements = [<CustomElement data={message} onClick={elementOnClick && (() => elementOnClick(CUSTOM))} />]
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

export { TextElement, ImageElement, TemplateElement }

export default FacebookElement
