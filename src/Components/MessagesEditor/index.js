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
    const { messages, channel } = this.props
    if (channel === FACEBOOK) {
      return <FacebookEditor data={messages} />
    } else if (channel === LINE) {
      return <LineEditor data={messages} />
    }
  }
}

MessageEditor.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]),
  messages: PropTypes.arrayOf(PropTypes.object),
}

export { FacebookEditor, LineEditor }
export default MessageEditor
