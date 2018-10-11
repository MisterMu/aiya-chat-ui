import React from 'react'
import PropTypes from 'prop-types'
import FacebookEditor from './FacebookEditor'

class MessageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  render() {
    const { messages, channel } = this.props
    if (channel === 'facebook') {
      return <FacebookEditor data={messages} />
    }
  }
}

MessageEditor.propTypes = {
  channel: PropTypes.oneOf(['facebook', 'line']),
  messages: PropTypes.arrayOf(PropTypes.object),
}

export default MessageEditor
