import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TextBubble = styled.div`
  background-color: ${props => props.color || '#eeeeee'};
  padding: 8px 16px;
  border-radius: 8px;
`

const TextUI = props => {
  return <TextBubble> text is {props.text}</TextBubble>
}

TextUI.propTypes = {
  text: PropTypes.string,
}

export default TextUI
