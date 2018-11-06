import React from 'react'
import PropTypes from 'prop-types'
import { Select, Icon } from 'antd'
import UrlButton from './UrlButton'
import PostbackButton from './PostbackButton'
import CallButton from './CallButton'
import InputField from '../../../InputField'
import ButtonObject, { Types } from '../../../../MessageObject/Facebook/Buttons'
import { AddBtn, IconButton, Flex } from '../../../styled'

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
    if (item.type) {
      tmp[index] = { ...ButtonObject[item.type] }
    } else {
      tmp[index] = { ...tmp[index], ...item }
    }
    updateButtons(tmp)
  }

  delBtn = indexToDelete => {
    const { data, updateButtons } = this.props
    let tmp = [...data]
    tmp.splice(indexToDelete, 1)
    updateButtons(tmp)
  }

  render() {
    const { data, max } = this.props
    if (!data) {
      return null
    }

    return (
      <React.Fragment>
        {data.map((btn, i) => (
          <React.Fragment key={i}>
            <InputField label={`Button#${i + 1}`}>
              <Flex>
                <div style={{ width: 'calc(100% - 32px)' }}>
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
                </div>
                {i !== 0 && (
                  <IconButton onClick={() => this.delBtn(i)}>
                    <Icon type="close-circle" theme="filled" className="danger-icon" />
                  </IconButton>
                )}
              </Flex>
            </InputField>
          </React.Fragment>
        ))}
        {data.length < (max || Number.POSITIVE_INFINITY) && (
          <AddBtn onClick={this.addBtn}>
            <span>
              <Icon type="plus-circle" /> Add Button
            </span>
          </AddBtn>
        )}
      </React.Fragment>
    )
  }
}

ButtonsForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  updateButtons: PropTypes.func.isRequired,
  max: PropTypes.number,
}

export default ButtonsForm
