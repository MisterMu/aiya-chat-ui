import styled from 'styled-components'

const BubbleMessage = styled.span`
  background-color: ${props => props.color || '#eeeeee'};
  border-radius: 8px;
  padding: 8px 16px;
  display: inline-block;
`

const ImageContainer = styled.div`
  width: 320px;
  height: 320px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background-color: white;
`

export { BubbleMessage, ImageContainer }
