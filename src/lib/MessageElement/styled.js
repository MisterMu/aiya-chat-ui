import styled from 'styled-components'

const BubbleMessage = styled.span`
  background-color: ${props => props.color || '#eeeeee'};
  border-radius: 8px;
  padding: 8px 16px;
  display: inline-block;
`

const QuickReplyButton = styled.div``

export { BubbleMessage, QuickReplyButton }
