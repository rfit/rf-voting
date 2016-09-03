import React, {PropTypes} from 'react'

export const Item = (props) => {
  const id = props.id
  let style = {}
  if (props.selected) { style = {'backgroundColor': 'grey'} }

  /* eslint-disable */
  return (
    <button onClick={() => props.onButtonClick(id)} style={style}>
      <h2>{props.name}</h2>
    </button>
  )
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}
