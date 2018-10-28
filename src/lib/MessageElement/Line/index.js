import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import TextElement from './Text'
import ImageElement from './Image'
import AudioElement from './Audio'
import TemplateElement from './Templates'
import QuickRepliesElement from './QuickReplies'
import { MessageContainer, BubbleContainer } from '../styled'
import ImagemapElement from './Imagemap'
import CustomElement from './Custom'

const { TEXT, IMAGE, AUDIO, TEMPLATES, QUICKREPLIES, CUSTOM, IMAGEMAP } = messageTypes

const LineElement = props => {
  const { message, showQuickReplies, elementOnClick, align } = props
  if (!message) {
    return null
  }

  let messageElements = []

  if (message.type === 'text') {
    messageElements = [<TextElement text={message.text} onClick={elementOnClick && (() => elementOnClick(TEXT))} />]
  } else if (message.type === 'image') {
    const { previewImageUrl } = message
    messageElements = [<ImageElement url={previewImageUrl} onClick={elementOnClick && (() => elementOnClick(IMAGE))} />]
  } else if (message.type === 'audio') {
    const { originalContentUrl } = message
    messageElements = [
      <AudioElement url={originalContentUrl} onClick={elementOnClick && (() => elementOnClick(AUDIO))} />,
    ]
  } else if (message.type === 'template') {
    const { template } = message
    messageElements = [
      <TemplateElement data={template} onClick={elementOnClick && (() => elementOnClick(TEMPLATES))} />,
    ]
  } else if (message.type === 'imagemap') {
    const { baseUrl } = message
    messageElements = [<ImagemapElement url={baseUrl} onClick={elementOnClick && (() => elementOnClick(IMAGEMAP))} />]
  }

  if (messageElements.length === 0) {
    messageElements = [<CustomElement data={message} onClick={elementOnClick && (() => elementOnClick(CUSTOM))} />]
  }

  if (showQuickReplies && message.quickReply) {
    messageElements = [
      ...messageElements,
      <QuickRepliesElement
        quickReplies={message.quickReply}
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

LineElement.propTypes = {
  message: PropTypes.object,
  showQuickReplies: PropTypes.bool,
  elementOnClick: PropTypes.func,
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

export { TextElement, ImageElement, QuickRepliesElement }

export default LineElement
