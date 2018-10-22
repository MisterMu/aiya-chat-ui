import React from 'react'
import PropTypes from 'prop-types'
import GenericTemplateElement from './GenericTemplateElement'
import { Flex } from '../../../styled'

const GenericTemplates = props => {
  const dataElements = props.data
  return (
    <Flex>
      {dataElements.map((data, i) => (
        <React.Fragment key={i}>
          <GenericTemplateElement data={data} />
        </React.Fragment>
      ))}
    </Flex>
  )
}

GenericTemplates.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      imageRatio: PropTypes.string,
      imageUrl: PropTypes.string,
      subtitle: PropTypes.string,
      buttons: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  ),
}

export default GenericTemplates
