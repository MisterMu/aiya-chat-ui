import React from 'react'
import PropTypes from 'prop-types'
import { messageTypes } from '../../../constants'
import TextElement from './Text'
import ImageElement from './Image'
import QuickRepliesElement from './QuickReplies'
import { MessageContainer, BubbleContainer } from '../styled'

const { TEXT, IMAGE, QUICKREPLIES } = messageTypes

const LineElement = props => {
  const { message, showQuickReplies, elementOnClick, align } = props
  console.log(message)
  if (!message || !message.type) {
    return null
  }

  let messageElements = []

  if (message.type === 'text') {
    messageElements = [<TextElement text={message.text} onClick={() => elementOnClick(TEXT)} />]
  } else if (message.type === 'image') {
    const { previewImageUrl } = message
    messageElements = [<ImageElement url={previewImageUrl} onClick={() => elementOnClick(IMAGE)} />]
  } else {
    return null
  }

  if (showQuickReplies && message.quickReply) {
    messageElements = [
      ...messageElements,
      <QuickRepliesElement
        quickReplies={message.quickReply}
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

LineElement.propTypes = {
  message: PropTypes.object,
  showQuickReplies: PropTypes.bool,
  elementOnClick: PropTypes.func,
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

export { TextElement, ImageElement, QuickRepliesElement }

export default LineElement
