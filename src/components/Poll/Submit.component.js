import React, {PropTypes} from 'react'

export const Submit = (props) => (
  <button onClick={props.submitAction}>
    <h1>Submit</h1>
  </button>
)

Submit.propTypes = {
  submitAction: PropTypes.func.isRequired
}
