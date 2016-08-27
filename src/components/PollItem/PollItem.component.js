import React, {Component, PropTypes} from 'react'

export class PollItem extends Component {
  render () {
    const id = this.props.id
    let style = {}
    if (this.props.selected) { style = {'backgroundColor': 'grey'} }

    /* eslint-disable */
    return (
      <button onClick={() => this.props.onButtonClick(id)} style={style}>
        <h2>{this.props.name}</h2>
      </button>
    )
  }
}

PollItem.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}
