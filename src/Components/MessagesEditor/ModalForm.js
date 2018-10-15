import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const ModalForm = props => {
  const { visible, onCancel } = props
  return (
    <Modal
      title="Edit Message Form"
      visible={visible}
      onCancel={onCancel}
      footer={false}
      destroyOnClose
    >
      {props.children}
    </Modal>
  )
}

ModalForm.propTypes = {
  children: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ModalForm
