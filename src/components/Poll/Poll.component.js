import React, {Component, PropTypes} from 'react'

import {PollItem} from '../PollItem/PollItem.component'

export class Poll extends Component {
  constructor () {
    super()
    // set initial state
    this.state = {
      'selectedItems': []
    }
  }

  handleClick (number) {
    const index = this.state.selectedItems.indexOf(number)
    if (index >= 0) {
      // create new array
      let newArray = this.state.selectedItems.slice(0, index)
      newArray = newArray.concat(this.state.selectedItems.slice(index + 1))
      // set new state
      this.setState({
        selectedItems: newArray
      })
    } else if (index === -1) {
      // create new array
      const newArray = this.state.selectedItems.concat(number)
      // set new state
      this.setState({
        selectedItems: newArray
      })
    }
  }

  render () {
    console.log('STATE:', this.state)
    return (
      <div>
        <h1>This is RF Poll!</h1>
        <p>Take a look at our project thingies:</p>
        {
          this.props.items.map((item, key) => {
            let selected = false
            if (this.state.selectedItems.indexOf(key) > -1) {
              selected = true
            }

            return (
              <div>
                <PollItem
                  name={item.name}
                  key={key}
                  number={key}
                  onButtonClick={(e) => this.handleClick(e)} // eslint-disable-line
                  selected={selected} />
                <br />
              </div>
            )
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
