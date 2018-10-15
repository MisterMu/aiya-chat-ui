import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Divider } from 'antd'
import _ from 'lodash'
import ModalForm from './ModalForm'
import MessageRender from '../MessageRender'
import { Flex, IconButton } from '../styled'
import { channelTypes, messageTypes } from '../../constants'
import { FacebookForm, LineForm } from '../../lib/MessageForm'
import {
  getFacebookMessageType,
  getLineMessageType,
  getFacebookMessageObject,
  getLineMessageObject,
} from '../../utils'

const { FACEBOOK, LINE } = channelTypes
const { TEXT, AUDIO, IMAGE, VIDEO, FILE } = messageTypes

class MessageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
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

  addMessage = newMsg => {
    const { onUpdate } = this.props
    const { messages } = this.state
    let tmp = [...messages]
    if (!_.isEmpty(newMsg)) {
      tmp = [...tmp, newMsg]
      this.setState({ messages: tmp })
    }
    onUpdate && onUpdate(tmp, 'add')
  }

  updateMessage = (message, index) => {
    const { onUpdate } = this.props
    let tmp = [...this.state.messages]
    tmp[index] = message
    this.setState({ messages: tmp })
    this.closeModal()
    onUpdate && onUpdate(tmp, 'edit')
  }

  deleteMessage = index => {
    const { onUpdate } = this.props
    let tmp = [...this.state.messages]
    tmp.splice(index, 1)
    this.setState({ messages: tmp })
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
    this.addMessage(newMsg)
  }

  componentWillMount() {
    const { messages } = this.props
    this.setState({ messages })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages !== this.props.messages) {
      this.setState({ messages: nextProps.messages })
    }
  }

  render() {
    const { channel, style, noMessageText } = this.props
    const { messages, editIndex, modalState } = this.state

    // variables for each channel
    let EditForm = null
    let avaliableType = []
    let editFormType = ''

    // assign neccessary value for each channel editor
    if (channel === FACEBOOK) {
      editFormType = editIndex !== -1 && getFacebookMessageType(messages[editIndex])
      EditForm = FacebookForm
      avaliableType = [TEXT, AUDIO, IMAGE, VIDEO, FILE]
    } else if (channel === LINE) {
      editFormType = editIndex !== -1 && getLineMessageType(messages[editIndex])
      EditForm = LineForm
      avaliableType = [TEXT, AUDIO, IMAGE, VIDEO]
    }

    return (
      <div style={{ padding: 16, ...style }}>
        {(messages || []).map((message, i) => (
          <Flex style={{ justifyContent: 'flex-end', marginBottom: 8 }} key={i}>
            <div style={{ cursor: 'pointer' }} onClick={() => this.startEdit(i)}>
              <MessageRender channel={channel} message={message} />
            </div>
            <IconButton color="red">
              <Icon type="delete" onClick={() => this.deleteMessage(i)} />
            </IconButton>
          </Flex>
        ))}
        {(messages.length === 0 || !messages) && (
          <div style={{ textAlign: 'center', color: '#999999' }}>
            <i>{noMessageText || 'No Data'}</i>
          </div>
        )}
        <Divider />
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
        <ModalForm visible={modalState} onCancel={this.closeModal}>
          <EditForm
            type={editFormType || undefined}
            defaultValue={messages[editIndex]}
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
  messages: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func,
  style: PropTypes.object,
  noMessageText: PropTypes.string,
}

const FacebookEditor = props => <MessageEditor channel={FACEBOOK} {...props} />
const LineEditor = props => <MessageEditor channel={LINE} {...props} />

export { FacebookEditor, LineEditor }
export default MessageEditor
