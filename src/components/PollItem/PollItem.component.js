import React, {Component, PropTypes} from 'react'

export class PollItem extends Component {
  render () {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}

PollItem.propTypes = {
  name: PropTypes.string.isRequired
}
