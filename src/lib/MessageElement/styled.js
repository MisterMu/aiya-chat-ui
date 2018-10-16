import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const BubbleMessage = styled.span`
  background-color: ${props => props.color || '#eeeeee'};
  color: ${props => props.textColor || '#575757'};
  border-radius: 18px;
  padding: 8px 16px;
  display: inline-block;
`

const ImageContainer = styled.div`
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background-color: white;
`

const BubbleContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${props => props.align === 'left' && 'justify-content: flex-start'};
  ${props => props.align === 'center' && 'justify-content: center'};
  ${props => props.align === 'right' && 'justify-content: flex-end'};
  cursor: pointer;
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export { Flex, BubbleMessage, ImageContainer, BubbleContainer, MessageContainer }
