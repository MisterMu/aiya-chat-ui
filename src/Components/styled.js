import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`

const IconButton = styled.div`
  width: 16px;
  margin-left: 8px;
  position: relative;
  cursor: pointer;
  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &:hover {
    i {
      ${props => props.color && `color: ${props.color}`};
    }
  }
`

const DefaultText = styled.div`
  text-align: center;
  color: #999999;
`

export { Flex, IconButton, DefaultText }
