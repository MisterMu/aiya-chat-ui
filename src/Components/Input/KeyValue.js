import React from 'react'
import PropTypes from 'prop-types'
import { Input, Icon } from 'antd'
import styled from 'styled-components'

const AddFieldsContainer = styled.span`
  cursor: pointer;
  padding-bottom: 2px;
  &:hover {
    border-bottom: 1px solid rgba(0, 0, 0, 0.35);
  }
`

const IconBtn = styled.div`
  margin: 6px 4px;
  padding: 2px 2px 1px;
  position: relative;
  cursor: pointer;
  &:hover {
    color: red;
  }
`

class KeyValueInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }
  addField = () => {
    const { items } = this.state
    const tmp = [...items, { key: '', value: '' }]
    this.updateItem(tmp)
  }

  updateField = (item, i) => {
    const { items } = this.state
    let tmp = [...items]
    tmp[i] = { ...tmp[i], ...item }
    this.updateItem(tmp)
  }

  deleteField = i => {
    const { items } = this.state
    let tmp = [...items]
    tmp.splice(i, 1)
    this.updateItem(tmp)
  }

  updateItem = arr => {
    this.setState({ items: arr })
    const { onChange } = this.props
    let tmp = {}
    arr.forEach(({ key, value }) => {
      tmp = {
        ...tmp,
        [key]: value,
      }
    })
    onChange && onChange(tmp)
  }

  componentDidMount() {
    const { data } = this.props
    const items = Object.keys(data).map(key => ({ key, value: data[key] }))
    this.setState({ items })
  }

  render() {
    const { data } = this.props
    const { items } = this.state

    if (!data) {
      return null
    }
    return (
      <div style={{ width: '100%' }}>
        {items.map(({ key, value }, i) => (
          <div key={i} style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%', marginBottom: 8 }}>
            <Input
              placeholder="key"
              style={{ marginRight: 8 }}
              value={key}
              onChange={e => this.updateField({ key: e.target.value }, i)}
            />
            <Input placeholder="value" value={value} onChange={e => this.updateField({ value: e.target.value }, i)} />
            <IconBtn onClick={() => this.deleteField(i)}>
              <Icon type="close-circle" />
            </IconBtn>
          </div>
        ))}
        <AddFieldsContainer onClick={this.addField}>
          <Icon type="plus-circle-o" style={{ marginRight: 8 }} />
          Add Field
        </AddFieldsContainer>
      </div>
    )
  }
}

KeyValueInput.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default KeyValueInput
