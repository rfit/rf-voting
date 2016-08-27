import React, {Component, PropTypes} from 'react'

export class PollItem extends Component {
  render () {
    const number = this.props.number
    let style = {}
    if (this.props.selected) { style = {'backgroundColor': 'grey'} }

    /* eslint-disable */
    return (
      <button onClick={() => this.props.onButtonClick(number)} style={style}>
        <h2>{this.props.name}</h2>
      </button>
    )
  }
}

PollItem.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired
}
