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

  load = data => {}

  startEdit = index => {
    console.log('edit', index)
    this.openModal()
    this.setState({ editIndex: index })
  }

  addMessage = component => {
    const { components } = this.state
    const tmp = [...components, component]
    this.setState({ components: tmp })
    this.props.onUpdate && this.props.onUpdate('add', tmp)
  }

  updateMessage = (message, index) => {
    let tmp = [...this.state.data]
    tmp[index] = message
    this.setState({ data: tmp })
    this.closeModal()
    this.props.onUpdate && this.props.onUpdate('edit', tmp)
  }

  deleteMessage = index => {
    let tmp = [...this.state.components]
    tmp.splice(index, 1)
    this.setState({ components: tmp })
  }

  renderModal = form => {
    const { modalState } = this.state
    return (
      <Modal visible={modalState} onCancel={this.closeModal} destroyOnClose>
        {form}
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
