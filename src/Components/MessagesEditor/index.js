import React from 'react'
import PropTypes from 'prop-types'
import FacebookEditor from './FacebookEditor'
import LineEditor from './LineEditor'
import { channelTypes } from '../../constants'

const { FACEBOOK, LINE } = channelTypes

class MessageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  render() {
    const { messages, channel, onUpdate } = this.props
    if (channel === FACEBOOK) {
      return <FacebookEditor messages={messages} onUpdate={onUpdate} />
    } else if (channel === LINE) {
      return <LineEditor messages={messages} onUpdate={onUpdate} />
    }
  }
}

MessageEditor.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]),
  messages: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func,
}

export { FacebookEditor, LineEditor }
export default MessageEditor
