import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Divider } from 'antd'
import _ from 'lodash'
import shortid from 'shortid'
import ModalForm from './ModalForm'
import MessageRender from '../MessageRender'
import { Flex, IconButton, DefaultText } from '../styled'
import { channelTypes, messageTypes } from '../../constants'
import { FacebookForm, LineForm } from '../../lib/MessageForm'
import {
  getFacebookMessageType,
  getLineMessageType,
  getFacebookMessageObject,
  getLineMessageObject,
} from '../../utils'

const { FACEBOOK, LINE } = channelTypes
const { TEXT, IMAGE } = messageTypes

class MessageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
      modalState: false,
      editIndex: -1,
    }
  }

  openModal = () => {
    this.setState({ modalState: true })
  }

  closeModal = () => {
    this.setState({ modalState: false, editIndex: -1 })
  }

  startEdit = index => {
    this.setState({ editIndex: index })
    this.openModal()
  }

  addMessage = newData => {
    const { onUpdate } = this.props
    const { dataList } = this.state
    let tmp = [...dataList]
    tmp = [...tmp, newData]
    this.setState({ dataList: tmp })
    onUpdate && onUpdate(tmp, 'add')
  }

  updateMessage = (message, index) => {
    const { onUpdate } = this.props
    let tmp = [...this.state.dataList]
    tmp[index] = {
      ...tmp[index],
      message,
    }
    this.setState({ dataList: tmp })
    this.closeModal()
    onUpdate && onUpdate(tmp, 'edit')
  }

  deleteMessage = index => {
    const { onUpdate } = this.props
    let tmp = [...this.state.dataList]
    tmp.splice(index, 1)
    this.setState({ dataList: tmp })
    onUpdate && onUpdate(tmp, 'delete')
  }

  addBtnClicked = type => {
    const { channel } = this.props
    let newMsg = {}
    if (channel === FACEBOOK) {
      newMsg = getFacebookMessageObject(type)
    } else if (channel === LINE) {
      newMsg = getLineMessageObject(type)
    }
    if (!_.isEmpty(newMsg)) {
      const newData = {
        id: 'msg-' + shortid.generate(),
        type: type === TEXT ? 'text' : 'box',
        message: newMsg,
      }
      this.addMessage(newData)
    } else {
      console.error('Cannot add message!! This message type is not avaliable now.')
    }
  }

  renderMessages = () => {
    const { channel, noMessageText } = this.props
    const { dataList } = this.state

    return (
      <React.Fragment>
        {(dataList || []).map((data, i) => (
          <Flex style={{ justifyContent: 'flex-end', marginBottom: 8 }} key={i}>
            <div style={{ cursor: 'pointer' }} onClick={() => this.startEdit(i)}>
              <MessageRender channel={channel} data={data} />
            </div>
            <IconButton color="red">
              <Icon type="delete" onClick={() => this.deleteMessage(i)} />
            </IconButton>
          </Flex>
        ))}
        {(dataList.length === 0 || !dataList) && (
          <DefaultText>
            <i>{noMessageText || 'No Message'}</i>
          </DefaultText>
        )}
      </React.Fragment>
    )
  }

  renderToolbar = avaliableType => (
    <Flex style={{ justifyContent: 'center' }}>
      {avaliableType.map((type, key) => (
        <React.Fragment key={key}>
          <Button
            onClick={() => this.addBtnClicked(type)}
            icon="plus"
            style={{ textTransform: 'capitalize', marginRight: 8 }}
          >
            {type}
          </Button>
        </React.Fragment>
      ))}
    </Flex>
  )

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
    const { channel, style } = this.props
    const { dataList, editIndex, modalState } = this.state

    // variables for each channel
    let EditForm = null
    let avaliableType = []
    let editFormType = ''

    // assign neccessary value for each channel editor
    if (channel === FACEBOOK) {
      editFormType = editIndex !== -1 && getFacebookMessageType(dataList[editIndex].message)
      EditForm = FacebookForm
      avaliableType = [TEXT, IMAGE]
    } else if (channel === LINE) {
      editFormType = editIndex !== -1 && getLineMessageType(dataList[editIndex].message)
      EditForm = LineForm
      avaliableType = [TEXT, IMAGE]
    }

    return (
      <div style={{ padding: 16, ...style }}>
        {this.renderMessages()}
        <div style={{ paddingRight: 8, paddingLeft: 8 }}>
          <Divider />
        </div>
        {this.renderToolbar(avaliableType)}
        <ModalForm visible={modalState} onCancel={this.closeModal}>
          <EditForm
            type={editFormType || undefined}
            defaultValue={editIndex !== -1 && dataList[editIndex].message}
            onSubmit={message => this.updateMessage(message, editIndex)}
            closeForm={this.closeModal}
          />
        </ModalForm>
      </div>
    )
  }
}

MessageEditor.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]).isRequired,
  dataList: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func,
  style: PropTypes.object,
  noMessageText: PropTypes.string,
}

const FacebookEditor = props => <MessageEditor channel={FACEBOOK} {...props} />
const LineEditor = props => <MessageEditor channel={LINE} {...props} />

export { FacebookEditor, LineEditor }
export default MessageEditor
