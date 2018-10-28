import styled from 'styled-components'

const TemplateContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  overflow: hidden;
  margin-right: 8px;
  width: 320px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  h3 {
    margin-bottom: 8px;
  }
  pre {
    font-size: 0.9em;
    font-weight: 200;
  }
`

const ButtonContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  span {
    font-size: 1.1em;
    font-weight: 200;
    color: #7ca4f3;
  }
`

const ImageContainer = styled.div`
  width: 320px;
  height: ${props => (props.ratio === 'square' ? '320px' : '211.920529px')};
  background-color: white;
  background-image: ${props => `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`

export { TemplateContainer, ImageContainer, TextContainer, ButtonContainer }
