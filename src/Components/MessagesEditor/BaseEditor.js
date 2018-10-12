import React from 'react'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'

class BaseEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      modalState: false,
      editIndex: -1,
    }
    this.avaliableType = []
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

  addBtnClicked = type => {}

  renderToolbar = () => {
    return this.avaliableType.map((type, key) => (
      <React.Fragment key={key}>
        <Button
          onClick={() => this.addBtnClicked(type)}
          icon="plus"
          style={{ textTransform: 'capitalize', marginRight: 8 }}
        >
          {type}
        </Button>
      </React.Fragment>
    ))
  }

  componentWillMount() {
    const { messages } = this.props
    this.setState({ messages })
  }
}

BaseEditor.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func,
}

export default BaseEditor
