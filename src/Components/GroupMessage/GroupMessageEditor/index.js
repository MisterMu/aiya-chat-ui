import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'
import shortid from 'shortid'
import GroupMessage from './GroupMessage'
import { channelTypes, actionTypes } from '../../../constants'
import { Flex, DefaultText } from '../../styled'

const { ADD, UPDATE, DELETE } = actionTypes

const { FACEBOOK, LINE } = channelTypes

class GroupMessageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
    }
  }

  addGroup = () => {
    const { dataList } = this.state
    const { onUpdate } = this.props
    const newGroup = {
      name: 'group-' + shortid.generate(),
      title: '',
      when: 'true',
      messages: [],
    }
    const tmp = [...dataList, newGroup]
    this.setState({ dataList: tmp })
    onUpdate && onUpdate(tmp, ADD)
  }

  updateGroup = (item, indexToUpdate) => {
    const { dataList } = this.state
    const { onUpdate } = this.props
    let tmp = [...dataList]
    tmp[indexToUpdate] = { ...tmp[indexToUpdate], ...item }
    this.setState({ dataList: tmp })
    onUpdate && onUpdate(tmp, UPDATE)
  }

  deleteGroup = indexToDelete => {
    const { dataList } = this.state
    const { onUpdate } = this.props
    let tmp = [...dataList]
    tmp.splice(indexToDelete, 1)
    this.setState({ dataList: tmp })
    onUpdate && onUpdate(tmp, DELETE)
  }

  componentWillMount() {
    const { dataList } = this.props
    this.setState({ dataList })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataList !== this.props.dataList) {
      this.setState({ dataList: nextProps.dataList })
    }
  }

  render() {
    const { channel, noMessageText } = this.props
    const { dataList } = this.state
    if (!dataList && !Array.isArray(dataList)) {
      return null
    }
    return (
      <div style={{ padding: 16 }}>
        {dataList.map((group, i) => (
          <React.Fragment key={i}>
            <GroupMessage
              style={{ marginBottom: 16 }}
              data={group}
              channel={channel}
              updateGroup={item => this.updateGroup(item, i)}
              deleteGroup={() => this.deleteGroup(i)}
              disabledToolbar={i === 0}
            />
          </React.Fragment>
        ))}
        {dataList.length === 0 && (
          <DefaultText>
            <i>{noMessageText || 'No Group Message'}</i>
          </DefaultText>
        )}
        <Divider />
        <Flex style={{ justifyContent: 'center' }}>
          <Button icon="plus" onClick={this.addGroup}>
            Add Group
          </Button>
        </Flex>
      </div>
    )
  }
}

GroupMessageEditor.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]).isRequired,
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      when: PropTypes.string,
      title: PropTypes.string,
      messages: PropTypes.arrayOf(PropTypes.object),
    }),
  ),
  noMessageText: PropTypes.string,
  onUpdate: PropTypes.func,
}

export default GroupMessageEditor
