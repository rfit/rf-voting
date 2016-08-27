import React, {Component, PropTypes} from 'react'

import {PollItem} from '../PollItem/PollItem.component'

export class Poll extends Component {
  constructor () {
    super()
    // set initial state
    this.state = {
      'selectedItem': 0
    }
  }

  render () {
    return (
      <div>
        <h1>This is RF Poll!</h1>
        <p>Take a look at our project thingies:</p>
        {
          this.props.items.map((item, key) => {
            return <PollItem name={item.name} key={key} />
          })
        }
      </div>
    )
  }
}

Poll.propTypes = {
  items: PropTypes.array.isRequired
}

Poll.displayName = 'Poll'
