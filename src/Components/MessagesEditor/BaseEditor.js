import React from 'react'
// import * as Message from '../../lib/MessageElement/Facebook'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

class BaseEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      components: [],
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

  addMessage = component => {
    const { onUpdate } = this.props
    const { components } = this.state
    const tmp = [...components, component]
    this.setState({ components: tmp })
    onUpdate && onUpdate(tmp, 'add')
  }

  updateMessage = (message, index) => {
    const { onUpdate } = this.props
    let tmp = [...this.state.data]
    tmp[index] = message
    this.setState({ data: tmp })
    this.closeModal()
    onUpdate && onUpdate(tmp, 'edit')
  }

  deleteMessage = index => {
    const { onUpdate } = this.props
    let tmp = [...this.state.components]
    tmp.splice(index, 1)
    this.setState({ components: tmp })
    onUpdate && onUpdate(tmp, 'delete')
  }

  renderModal = Form => {
    const { modalState, data, editIndex } = this.state
    return (
      <Modal
        title="Edit Message Form"
        visible={modalState}
        onCancel={this.closeModal}
        footer={false}
        destroyOnClose
      >
        <Form
          defaultValue={data[editIndex]}
          onSubmit={message => this.updateMessage(message, editIndex)}
          closeForm={this.closeModal}
        />
      </Modal>
    )
  }

  renderToolbar = () => {}

  componentWillMount() {
    const { data } = this.props
    this.setState({ data })
  }
}

BaseEditor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func,
}

export default BaseEditor
