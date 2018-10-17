import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 8px;
  background-color: #97d385;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 0.9em;
`

const ImageContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
  background-image: ${props => `url(${props.imageUrl})`};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`

const QuickReplyElement = props => {
  const { data } = props
  return (
    <Container>
      {data && data.imageUrl && <ImageContainer imageUrl={data.imageUrl} />}
      <span style={{ color: 'white' }}>
        {(data && data.action && data.action.label) || 'Title'}
      </span>
    </Container>
  )
}

QuickReplyElement.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    action: PropTypes.objectOf(PropTypes.string),
  }),
}

export default QuickReplyElement
