import React from 'react'
import PropTypes from 'prop-types'
import MessageRender from '../MessageRender'
import { Flex, DefaultText } from '../styled'
import { channelTypes } from '../../constants'

const { FACEBOOK, LINE } = channelTypes

class MessagesPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { messages, channel, align, style, noMessageText } = this.props
    let msgAlign = ''
    if (align === 'right') {
      msgAlign = 'flex-end'
    } else if (align === 'center') {
      msgAlign = 'center'
    } else if (align === 'left') {
      msgAlign = 'flex-start'
    }
    return (
      <div style={{ ...style }}>
        {(messages || []).map((message, i) => (
          <Flex style={{ marginBottom: 8, justifyContent: msgAlign }}>
            <MessageRender channel={channel} message={message} />
          </Flex>
        ))}
        {(!messages || messages.length === 0) && (
          <DefaultText>
            <i>{noMessageText || 'No Message'}</i>
          </DefaultText>
        )}
      </div>
    )
  }
}

MessagesPreview.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]).isRequired,
  messages: PropTypes.arrayOf(PropTypes.any).isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  style: PropTypes.object,
  noMessageText: PropTypes.string,
}

export default MessagesPreview
