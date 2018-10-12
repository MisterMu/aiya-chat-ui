import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { FacebookMessage, LineMessage } from '../../lib/MessageElement'
import { getFacebookForm, getLineForm } from '../../lib/MessageForm/'
import { getFacebookMessage, getLineMessage } from '../../lib/messages'
import { getFacebookMessageType, getLineMessageType } from '../../lib/types'
import { channelTypes, messageTypes } from '../../constants'

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
    this.setState({ modalState: false })
  }

  startEdit = index => {
    this.openModal()
    this.setState({ editIndex: index })
  }

  addMessage = newMsg => {
    const { onUpdate } = this.props
    const { messages } = this.state
    let tmp = [...messages]
    if (newMsg) {
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

  renderModal = Form => {
    const { modalState, messages, editIndex } = this.state
    if (Form) {
      return (
        <Modal
          title="Edit Message Form"
          visible={modalState}
          onCancel={this.closeModal}
          footer={false}
          destroyOnClose
        >
          <Form
            defaultValue={messages[editIndex]}
            onSubmit={message => this.updateMessage(message, editIndex)}
            closeForm={this.closeModal}
          />
        </Modal>
      )
    }
  }

  addBtnClicked = type => {
    const { channel } = this.props
    let newMsg = {}
    if (channel === FACEBOOK) {
      newMsg = getFacebookMessage(type)
    } else if (channel === LINE) {
      newMsg = getLineMessage(type)
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
    const { channel } = this.props
    const { messages, editIndex } = this.state

    // variables for each channel
    let editForm = ''
    let MessageElement
    let avaliableType = []

    // assign neccessary value for each channel editor
    if (channel === FACEBOOK) {
      const editFormType = editIndex !== -1 && getFacebookMessageType(messages[editIndex])
      editForm = getFacebookForm(editFormType)
      MessageElement = FacebookMessage
      avaliableType = [TEXT, AUDIO, IMAGE, VIDEO, FILE]
    } else if (channel === LINE) {
      const editFormType = editIndex !== -1 && getLineMessageType(messages[editIndex])
      editForm = getLineForm(editFormType)
      MessageElement = LineMessage
      avaliableType = [TEXT, AUDIO, IMAGE, VIDEO]
    }

    console.log(channel, FACEBOOK, LINE)

    return (
      <div>
        {messages.map((message, i) => (
          <div key={i} onClick={() => this.startEdit(i)}>
            <MessageElement message={message} />
          </div>
        ))}
        <div>
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
        </div>
        {this.renderModal(editForm)}
      </div>
    )
  }
}

MessageEditor.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]),
  messages: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func,
}

const FacebookEditor = props => <MessageEditor channel={FACEBOOK} {...props} />
const LineEditor = props => <MessageEditor channel={LINE} {...props} />

export { FacebookEditor, LineEditor }
export default MessageEditor
