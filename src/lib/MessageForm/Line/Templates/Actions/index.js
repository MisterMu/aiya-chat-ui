import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import ActionForm from './ActionForm'
import actionObject from '../../../../MessageObject/Line/actions'
import InputField from '../../../InputField'
import { Flex, IconButton, AddBtn } from '../../../styled'

class ActionsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addAction = () => {
    const { data, updateActions } = this.props
    const tmp = [...data, actionObject.message]
    updateActions(tmp)
  }

  updateAction = (item, indexToUpdate) => {
    const { data, updateActions } = this.props
    let tmp = [...data]
    tmp[indexToUpdate] = { ...data[indexToUpdate], ...item }
    updateActions(tmp)
  }

  delAction = indexToDelete => {
    const { data, updateActions } = this.props
    let tmp = [...data]
    tmp.splice(indexToDelete, 1)
    updateActions(tmp)
  }

  render() {
    const { data, max } = this.props
    if (!data) {
      return null
    }
    return (
      <React.Fragment>
        {data.map((action, i) => (
          <React.Fragment key={i}>
            <InputField label={`Action #${i + 1}`}>
              <Flex>
                <div style={{ width: 'calc(100% - 32px)' }}>
                  <ActionForm data={action} updateAction={item => this.updateAction(item, i)} />
                </div>
                {i !== 0 && (
                  <IconButton onClick={() => this.delAction(i)}>
                    <Icon type="close-circle" theme="filled" className="danger-icon" />
                  </IconButton>
                )}
              </Flex>
            </InputField>
          </React.Fragment>
        ))}
        {data.length < (max || Number.POSITIVE_INFINITY) && (
          <AddBtn onClick={this.addAction}>
            <span>
              <Icon type="plus-circle" /> Add Action
            </span>
          </AddBtn>
        )}
      </React.Fragment>
    )
  }
}

ActionsForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  updateActions: PropTypes.func.isRequired,
  max: PropTypes.number,
}

export { ActionForm }

export default ActionsForm
