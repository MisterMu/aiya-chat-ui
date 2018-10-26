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
  h3 {
    margin-bottom: 8px;
  }
  pre {
    color: rgba(0, 0, 0, 0.35);
  }
`

const ImageCover = styled.div`
  width: 320px;
  height: ${props => (props.ratio === 'square' ? '320px' : '167.539267px')};
  background-color: white;
  background-image: ${props => `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TemplateButton = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  span {
    font-size: 1.1em;
    color: #7ca4f3;
  }
`

export { TemplateContainer, TextContainer, ImageCover, ButtonContainer, TemplateButton }
