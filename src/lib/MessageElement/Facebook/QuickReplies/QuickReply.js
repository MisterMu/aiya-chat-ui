import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 8px;
  border: 1px solid #70a5f9;
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
  let title = ''
  let prefixField = null
  if (data.content_type === 'text') {
    title = data.title
    prefixField = data.image_url ? <ImageContainer imageUrl={data.image_url} /> : null
  } else if (data.content_type === 'location') {
    title = 'Send Location'
    prefixField = <Icon type="environment" theme="filled" style={{ marginRight: 8 }} />
  } else if (data.content_type === 'user_email') {
    title = 'example@mail.com'
  } else if (data.content_type === 'user_phone_number') {
    title = '+66123456789'
  }

  return (
    <Container>
      {prefixField}
      <span style={{ color: '#3982F7' }}>{title}</span>
    </Container>
  )
}

QuickReplyElement.propTypes = {
  data: PropTypes.object,
}

export default QuickReplyElement
