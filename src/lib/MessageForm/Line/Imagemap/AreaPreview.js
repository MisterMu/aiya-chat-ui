import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Box = styled.div`
  width: ${props => `calc(${props.size}% - 8px)`};
  height: 0;
  padding-top: ${props => `calc(${props.size}% - 8px)`};
  margin: 4px;
  position: relative;
  background-color: ${props => (props.selected ? 'blue' : 'lightgrey')};
  span {
    position: absolute;
    font-size: ${props => `${props.size}px`};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${props => (props.selected ? 'white' : 'inherit')};
    cursor: default;
  }
`

class AreaPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { gridSize, selected, onSelect } = this.props
    if (!gridSize) {
      return null
    }

    const { row } = gridSize

    return (
      <div style={{ marginTop: 16 }}>
        {[...Array(gridSize.col).keys()].map(i => (
          <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
            {[...Array(gridSize.row).keys()].map(j => {
              const index = i * row + j
              return (
                <Box size={100 / row} key={index} selected={selected === index} onClick={() => onSelect(index)}>
                  <span>{index + 1}</span>
                </Box>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
}

AreaPreview.propTypes = {
  gridSize: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number,
  }),
  selected: PropTypes.number,
  onSelect: PropTypes.func,
}

export default AreaPreview
