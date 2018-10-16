import React from 'react'
import PropTypes from 'prop-types'
import QuickReplyElement from './QuickReply'
import { Flex } from '../../styled'

const QuickRepliesElement = props => {
  const { quickReplies, onClick } = props
  return (
    <Flex style={{ justifyContent: 'center' }} onClick={onClick}>
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

QuickRepliesElement.propTypes = {
  quickReplies: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
}

export default QuickRepliesElement
