import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '../../styled'
import QuickReplyElement from './QuickReply'

class QuickRepliesElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { quickReplies, onClick } = this.props
    return (
      <Flex style={{ justifyContent: 'center' }} onClick={onClick}>
        {quickReplies &&
          quickReplies.items.map((quickReply, key) => {
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
  quickReplies: PropTypes.arrayOf(
    PropTypes.shape({
      items: PropTypes.object,
    }),
  ),
  onClick: PropTypes.func,
}

export default QuickRepliesElement
