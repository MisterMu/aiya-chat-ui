import React from 'react'
import { InputNumber, Row, Col, Button, Divider } from 'antd'
import PropTypes from 'prop-types'
import InputField from '../../InputField'
import AreaPreview from './AreaPreview'
import _ from 'lodash'
import MapActionForm from './MapActionForm'

class ActionAreaForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actions: [],
      row: 1,
      col: 1,
      selectedIndex: -1,
      gridSize: {},
    }
  }

  generateGrid = () => {
    const { maxHeight, maxWidth, updateActions } = this.props
    const { row, col } = this.state
    let tmp = []
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        const index = i * row + (j + 1)
        const width = maxWidth / row
        const height = maxHeight / col
        const newAction = {
          type: 'message',
          text: `Box ${index}`,
          area: {
            x: width * j,
            y: height * i,
            width,
            height,
          },
        }
        tmp = [...tmp, newAction]
      }
    }
    const gridSize = {
      row,
      col,
    }
    this.setState({ actions: tmp, gridSize })
    updateActions(tmp, { row, col })
  }

  updateAction = (item, indexToUpdate) => {
    const { updateActions } = this.props
    const { actions } = this.state
    let tmp = [...actions]
    if (item.type === 'message') {
      tmp[indexToUpdate] = {
        type: 'message',
        text: '',
      }
    } else if (item.type === 'uri') {
      tmp[indexToUpdate] = {
        type: 'uri',
        linkUri: '',
      }
    } else {
      tmp[indexToUpdate] = { ...tmp[indexToUpdate], ...item }
    }
    this.setState({ actions: tmp })
    updateActions(tmp)
  }

  onGridSelect = index => {
    this.setState({ selectedIndex: index })
  }

  componentDidMount() {
    const { template, defaultActions } = this.props
    if (template) {
      this.setState({
        row: template.row,
        col: template.col,
        gridSize: { row: template.row, col: template.col },
        actions: defaultActions,
        selectedIndex: 0,
      })
    }
  }

  render() {
    const { maxHeight, maxWidth } = this.props
    if (!maxHeight || !maxWidth) {
      return null
    }

    const { row, col, selectedIndex, gridSize, actions } = this.state
    return (
      <React.Fragment>
        <Divider>Grid Actions</Divider>
        <InputField label="Grid">
          <InputNumber
            min={1}
            max={10}
            step={1}
            value={row || 1}
            onChange={val => this.setState({ row: val })}
            placeholder="Row"
          />
          <span style={{ marginLeft: 8, marginRight: 8 }}>x</span>
          <InputNumber
            min={1}
            max={10}
            step={1}
            value={col || 1}
            onChange={val => this.setState({ col: val })}
            placeholder="Col"
          />
          <Button icon="sync" style={{ marginLeft: 8 }} onClick={this.generateGrid}>
            Generate Grid
          </Button>
        </InputField>
        {!_.isEmpty(gridSize) && (
          <React.Fragment>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <AreaPreview gridSize={gridSize} selected={selectedIndex} onSelect={this.onGridSelect} />
              </Col>
              <Col span={12}>
                {selectedIndex !== -1 && (
                  <MapActionForm
                    data={actions[selectedIndex]}
                    updateAction={item => this.updateAction(item, selectedIndex)}
                  />
                )}
              </Col>
            </Row>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

ActionAreaForm.propTypes = {
  maxHeight: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  defaultActions: PropTypes.arrayOf(PropTypes.object),
  updateActions: PropTypes.func.isRequired,
  template: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number,
  }).isRequired,
}

export default ActionAreaForm
