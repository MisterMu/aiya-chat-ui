import React from 'react'
import PropTypes from 'prop-types'
import QuickReplyElement from './QuickReply'
import { Flex } from '../../styled'

class QuickRepliesElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { quickReplies } = this.props
    return (
      <Flex style={{ justifyContent: 'center' }}>
        {quickReplies.map((quickReply, key) => {
          return (
            <React.Fragment key={key}>
              <QuickReplyElement data={quickReply} />
            </React.Fragment>
          )
        })}
      </Flex>
    )
  }
}

QuickRepliesElement.propTypes = {
  quickReplies: PropTypes.arrayOf(PropTypes.object),
}

export default QuickRepliesElement
