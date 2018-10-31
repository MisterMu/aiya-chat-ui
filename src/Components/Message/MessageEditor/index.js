import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Divider } from 'antd'
import _ from 'lodash'
import shortid from 'shortid'
import ModalForm from './ModalForm'
import MessageRender from '../MessageRender'
import { Flex, IconButton, DefaultText } from '../../styled'
import { channelTypes, messageTypes, actionTypes } from '../../../constants'
import { FacebookForm, LineForm } from '../../../lib/MessageForm'
import { getFacebookMessageObject, getLineMessageObject, getDynamicMappingValue } from '../../../utils'

const { FACEBOOK, LINE } = channelTypes
const { TEXT, IMAGE, TEMPLATES, DYNAMIC_TEMPLATE, QUICKREPLIES, IMAGEMAP, CUSTOM } = messageTypes
const { ADD, UPDATE, DELETE } = actionTypes

class MessageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
      modalState: false,
      editIndex: -1,
      editType: '',
    }
  }

  openModal = () => {
    this.setState({ modalState: true })
  }

  closeModal = () => {
    this.setState({ modalState: false, editIndex: -1, editType: '' })
  }

  startEdit = (index, type) => {
    const { dataList } = this.state
    if (type === TEMPLATES && dataList[index].request != null) {
      this.setState({ editIndex: index, editType: DYNAMIC_TEMPLATE })
    } else {
      this.setState({ editIndex: index, editType: type })
    }
    this.openModal()
  }

  addMessage = newData => {
    const { onUpdate } = this.props
    const { dataList } = this.state
    let tmp = [...dataList]
    tmp = [...tmp, newData]
    this.setState({ dataList: tmp })
    onUpdate && onUpdate(tmp, ADD)
  }

  updateMessage = (message, extra, index) => {
    const { onUpdate } = this.props
    let tmp = [...this.state.dataList]
    if (extra) {
      tmp[index] = {
        ...tmp[index],
        ...extra,
      }
    }
    tmp[index] = {
      ...tmp[index],
      message,
    }
    this.setState({ dataList: tmp })
    this.closeModal()
    onUpdate && onUpdate(tmp, UPDATE)
  }

  deleteMessage = index => {
    const { onUpdate } = this.props
    let tmp = [...this.state.dataList]
    tmp.splice(index, 1)
    this.setState({ dataList: tmp })
    onUpdate && onUpdate(tmp, DELETE)
  }

  addBtnClicked = type => {
    const { channel } = this.props
    let newMsg = {}
    if (channel === FACEBOOK) {
      newMsg = getFacebookMessageObject(type)
    } else if (channel === LINE) {
      newMsg = getLineMessageObject(type)
    }

    if (_.isEmpty(newMsg)) {
      console.error('Cannot add message!! This message type is not avaliable now.')
      return null
    }
    if (type === QUICKREPLIES) {
      const { dataList } = this.state
      const lastData = dataList[dataList.length - 1]
      const lastMsg = lastData.message

      if (lastMsg.quick_replies || lastMsg.quickReply) {
        console.error('Message already have Quick Replies!!')
        return null
      }
      const { onUpdate } = this.props
      const newData = { ...lastData, type: 'box', message: { ...lastMsg, ...newMsg } }
      let tmp = [...dataList]
      tmp[dataList.length - 1] = newData
      this.setState({ dataList: tmp })
      onUpdate && onUpdate(tmp, ADD)
    } else if (type === DYNAMIC_TEMPLATE) {
      const newData = {
        name: 'msg-' + shortid.generate(),
        type: 'box',
        message: newMsg,
        request: { method: 'GET', uri: '', headers: {}, variables: {} },
        mapping: getDynamicMappingValue(channel),
        element: '',
      }
      this.addMessage(newData)
    } else if (type === IMAGEMAP) {
      const newData = {
        name: 'msg-' + shortid.generate(),
        type: 'box',
        message: newMsg,
        data: { template: { row: 1, col: 1 } },
      }
      this.addMessage(newData)
    } else {
      const newData = {
        name: 'msg-' + shortid.generate(),
        type: type === TEXT ? 'text' : 'box',
        message: newMsg,
      }
      this.addMessage(newData)
    }
  }

  renderMessages = () => {
    const { channel, noMessageText } = this.props
    const { dataList } = this.state

    return (
      <React.Fragment>
        {(dataList || []).map((data, i) => (
          <Flex style={{ justifyContent: 'flex-end', marginBottom: 8 }} key={i}>
            <Flex style={{ maxWidth: 'calc(100% - 24px)', overflow: 'auto', justifyContent: 'flex-start' }}>
              <MessageRender
                channel={channel}
                data={data}
                elementOnClick={type => this.startEdit(i, type)}
                align="right"
                showQuickReplies={i === dataList.length - 1}
              />
            </Flex>
            <IconButton onClick={() => this.deleteMessage(i)}>
              <Icon type="delete" className="danger-icon" />
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

  renderToolbar = avaliableType => {
    const { channel } = this.props
    const { dataList } = this.state
    if (channel === LINE && dataList.length >= 5) {
      return (
        <Flex style={{ justifyContent: 'center' }}>
          <i>Line Message can contain only 5 bubbles.</i>
        </Flex>
      )
    }
    return (
      <Flex style={{ justifyContent: 'center' }}>
        {avaliableType.map((type, key) => (
          <React.Fragment key={key}>
            <Button
              onClick={() => this.addBtnClicked(type)}
              icon="plus"
              style={{ textTransform: 'capitalize', marginRight: 8, marginBottom: 8 }}
            >
              {type}
            </Button>
          </React.Fragment>
        ))}
      </Flex>
    )
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
    const { channel, style, onUpload, enableCustomElement } = this.props
    const { dataList, editIndex, editType, modalState } = this.state

    // variables for each channel
    let EditForm = null
    let avaliableType = []

    // assign neccessary value for each channel editor
    if (channel === FACEBOOK) {
      EditForm = FacebookForm
      avaliableType = [TEXT, IMAGE, TEMPLATES, DYNAMIC_TEMPLATE, QUICKREPLIES]
    } else if (channel === LINE) {
      EditForm = LineForm
      avaliableType = [TEXT, IMAGE, TEMPLATES, DYNAMIC_TEMPLATE, IMAGEMAP, QUICKREPLIES]
    }

    if (enableCustomElement) {
      avaliableType = [...avaliableType, CUSTOM]
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
            type={editType || undefined}
            objectMsg={editIndex !== -1 && dataList[editIndex]}
            onUpload={onUpload}
            onSubmit={(message, extra) => this.updateMessage(message, extra, editIndex)}
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
  onUpload: PropTypes.func,
  onUpdate: PropTypes.func,
  style: PropTypes.object,
  noMessageText: PropTypes.string,
  enableCustomElement: PropTypes.bool,
}

const FacebookEditor = props => <MessageEditor channel={FACEBOOK} {...props} />
const LineEditor = props => <MessageEditor channel={LINE} {...props} />

export { FacebookEditor, LineEditor }
export default MessageEditor
