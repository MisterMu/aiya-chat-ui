import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`

const IconButton = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    .primary-icon {
      color: #438ef7;
    }
    .danger-icon {
      color: red;
    }
  }
`

const DefaultText = styled.div`
  text-align: center;
  color: #999999;
`

export { Flex, IconButton, DefaultText }
