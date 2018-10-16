import React from 'react'
import PropTypes from 'prop-types'

class QuickRepliesElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { quickReplies } = this.props
    console.log(quickReplies)
    return null
  }
}

QuickRepliesElement.propTypes = {
  quickReplies: PropTypes.arrayOf(
    PropTypes.shape({
      items: PropTypes.object,
    }),
  ),
}

export default QuickRepliesElement
