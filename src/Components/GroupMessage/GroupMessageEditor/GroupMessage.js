import React from 'react'
import { Card, Icon, Modal, Row, Col, Input } from 'antd'
import PropTypes from 'prop-types'
import { channelTypes } from '../../../constants'
import { Flex, IconButton } from '../../styled'
import MessageEditor from '../../Message/MessageEditor'

const { FACEBOOK, LINE } = channelTypes

class GroupMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalState: false,
      input: {
        title: '',
        when: '',
      },
    }
  }

  openModal = () => {
    this.setState({ modalState: true })
  }

  closeModal = () => {
    this.setState({ modalState: false })
  }

  onSubmit = e => {
    e && e.preventDefault()
    const { input } = this.state
    const { updateGroup } = this.props
    updateGroup && updateGroup({ ...input })
    this.closeModal()
  }

  onMessageUpdate = messages => {
    const { updateGroup } = this.props
    updateGroup && updateGroup({ messages })
  }

  deleteGroup = () => {
    const { deleteGroup } = this.props
    Modal.confirm({
      title: 'Are you sure to delete?',
      content: 'This action will pernalty remove this message group.',
      okType: 'danger',
      okText: 'Yes',
      cancelText: 'No',
      onOk: deleteGroup,
    })
  }

  renderToolBar = (
    <Flex>
      <IconButton onClick={this.openModal}>
        <Icon type="setting" className="primary-icon" />
      </IconButton>
      <IconButton onClick={this.deleteGroup}>
        <Icon type="delete" className="danger-icon" />
      </IconButton>
    </Flex>
  )

  componentDidMount() {
    const { data } = this.props
    this.setState({
      input: {
        title: data.title,
        when: data.when,
      },
    })
  }

  render() {
    const { channel, data, style, disabledToolbar, onUpload, enableCustomElement } = this.props
    const { modalState, input } = this.state
    if (!data) {
      return null
    }

    return (
      <React.Fragment>
        <Card
          type="inner"
          title={data.title || data.name}
          style={{ ...style }}
          extra={!disabledToolbar && this.renderToolBar}
        >
          <MessageEditor
            channel={channel}
            dataList={data.messages}
            onUpdate={this.onMessageUpdate}
            onUpload={onUpload}
            enableCustomElement={enableCustomElement}
          />
        </Card>
        <Modal title="GroupMessage" visible={modalState} onCancel={this.closeModal} onOk={this.onSubmit} destroyOnClose>
          <form onSubmit={this.onSubmit}>
            <Row gutter={8} style={{ marginBottom: 8 }}>
              <Col span={4}>
                <label>Title:</label>
              </Col>
              <Col span={20}>
                <Input
                  autoFocus
                  value={input.title}
                  placeholder="Give a name to this group.."
                  onChange={e => this.setState({ input: { ...input, title: e.target.value } })}
                />
              </Col>
            </Row>
            <Row gutter={8} style={{ marginBottom: 8 }}>
              <Col span={4}>
                <label>When:</label>
              </Col>
              <Col span={20}>
                <Input
                  value={input.when}
                  placeholder="If it's true messages in this group will be show.."
                  onChange={e => this.setState({ input: { ...input, when: e.target.value } })}
                />
              </Col>
            </Row>
          </form>
        </Modal>
      </React.Fragment>
    )
  }
}

GroupMessage.propTypes = {
  channel: PropTypes.oneOf([FACEBOOK, LINE]).isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    when: PropTypes.string,
    title: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.object),
  }),
  updateGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  disabledToolbar: PropTypes.bool,
  style: PropTypes.object,
  onUpload: PropTypes.func,
  enableCustomElement: PropTypes.bool,
}

export default GroupMessage
