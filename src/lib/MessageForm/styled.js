import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const Toolbar = styled(Flex)`
  i {
    cursor: pointer;
    margin-left: 8px;
  }
  .primary-icon:hover {
    color: #438ef7;
  }
  .danger-icon:hover {
    color: red;
  }
`

const InfoText = styled.span`
  color: rgba(0, 0, 0, 0.35);
  font-size: 0.85em;
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
  .primary-icon:hover {
    color: #438ef7;
  }
  .danger-icon:hover {
    color: red;
  }
`

const AddBtn = styled(Flex)`
  padding: 8px;
  cursor: pointer;
  justify-content: center;
  &:hover {
    span {
      text-decoration: underline;
    }
  }
`

export { Flex, Toolbar, InfoText, IconButton, AddBtn }
