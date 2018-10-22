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
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(36px, -50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
  .primary-icon:hover {
    color: #438ef7;
  }
  .danger-icon:hover {
    color: red;
  }
`

export { Flex, Toolbar, InfoText, IconButton }
