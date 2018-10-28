import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { channelTypes } from '../../../constants'
import MessageDisplay from '../../Message/MessageDisplay'
import { DefaultText } from '../../styled'

const { FACEBOOK, LINE } = channelTypes

const GroupMessageDisplay = props => {
  const { dataList, channel, align, noMessageText } = props
  if (!dataList && !Array.isArray(dataList)) {
    return null
  }

  return (
    <div style={{ padding: 16 }}>
      {dataList.map((data, i) => (
        <Card title={data.title || data.name} type="inner" style={{ marginBottom: 16 }}>
          <MessageDisplay channel={channel} dataList={data.messages} align={align || 'right'} />
        </Card>
      ))}
      {dataList.length === 0 && (
        <DefaultText>
          <i>{noMessageText || 'No Group Message'}</i>
        </DefaultText>
      )}
    </div>
  )
}

GroupMessageDisplay.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]).isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  noMessageText: PropTypes.string,
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      when: PropTypes.string,
      title: PropTypes.string,
      messages: PropTypes.arrayOf(PropTypes.object),
    }),
  ),
}

export default GroupMessageDisplay
