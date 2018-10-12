import React from 'react'
import PropTypes from 'prop-types'
import FacebookEditor from './FacebookEditor'
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
    }
  }
}

MessageEditor.propTypes = {
  channel: PropTypes.oneOf(['facebook', 'line']),
  messages: PropTypes.arrayOf(PropTypes.object),
}

export { FacebookEditor }
export default MessageEditor
