import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import { BubbleContainer, MessageContainer } from '../styled'
import TextElement from './Text'
import ImageElement from './Image'
import QuickRepliesElement from './QuickReplies'

const { TEXT, IMAGE, QUICKREPLIES } = messageTypes

const FacebookElement = props => {
  const { message, showQuickReplies, elementOnClick, align } = props
  if (!message) {
    return null
  }

  let messageElements = []
  if (message.text) {
    messageElements = [<TextElement text={message.text} onClick={() => elementOnClick(TEXT)} />]
  }

  if (message.attachment) {
    const attachmentType = message.attachment.type
    if (attachmentType === 'image') {
      const { payload } = message.attachment
      messageElements = [
        ...messageElements,
        <ImageElement url={payload.url} onClick={() => elementOnClick(IMAGE)} />,
      ]
    }
  }

  if (showQuickReplies && message.quick_replies) {
    messageElements = [
      ...messageElements,
      <QuickRepliesElement
        quickReplies={message.quick_replies}
        onClick={() => elementOnClick(QUICKREPLIES)}
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
