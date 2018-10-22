import React from 'react'
import PropTypes from 'prop-types'
import { Select, Icon } from 'antd'
import UrlButton from './UrlButton'
import PostbackButton from './PostbackButton'
import CallButton from './CallButton'
import InputField from '../../../InputField'
import ButtonObject, { Types } from '../../../../MessageObject/Facebook/Buttons'
import { Flex, IconButton } from '../../../styled'

const { URL, POSTBACK, CALL } = Types

class ButtonsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addBtn = () => {
    const { data, updateButtons } = this.props
    const tmp = [...data, ButtonObject.postback]
    updateButtons(tmp)
  }

  updateBtns = (item, index) => {
    const { data, updateButtons } = this.props
    let tmp = [...data]
    tmp[index] = { ...tmp[index], ...item }
    updateButtons(tmp)
  }

  delBtn = indexToDelete => {
    const { data, updateButtons } = this.props
    let tmp = [...data]
    tmp.splice(indexToDelete, 1)
    updateButtons(tmp)
  }

  render() {
    const { data } = this.props
    if (!data) {
      return null
    }

    return (
      <React.Fragment>
        {data.map((btn, i) => (
          <React.Fragment key={i}>
            <InputField label={`Button#${i + 1}`} style={{ marginRight: 24, position: 'relative' }}>
              <Select
                value={btn.type}
                onChange={val => this.updateBtns({ type: val }, i)}
                placeholder="-- Select Type --"
                style={{ width: 180, marginBottom: 8 }}
              >
                {Object.keys(Types).map(key => (
                  <Select.Option key={key} value={Types[key]}>
                    <span>{Types[key]}</span>
                  </Select.Option>
                ))}
              </Select>
              {btn.type === URL && <UrlButton data={btn} updateBtn={item => this.updateBtns(item, i)} />}
              {btn.type === POSTBACK && <PostbackButton data={btn} updateBtn={item => this.updateBtns(item, i)} />}
              {btn.type === CALL && <CallButton data={btn} updateBtn={item => this.updateBtns(item, i)} />}
              {i !== 0 && (
                <IconButton onClick={() => this.delBtn(i)}>
                  <Icon type="close-circle" theme="filled" className="danger-icon" />
                </IconButton>
              )}
            </InputField>
          </React.Fragment>
        ))}
        {data.length < 3 && (
          <Flex style={{ padding: 8, cursor: 'pointer', justifyContent: 'center' }} onClick={this.addBtn}>
            <span style={{ textDecoration: 'underline' }}>
              <Icon type="plus-circle" style={{ marginRight: 8 }} /> Add Button
            </span>
          </Flex>
        )}
      </React.Fragment>
    )
  }
}

ButtonsForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  updateButtons: PropTypes.func.isRequired,
}

export default ButtonsForm
