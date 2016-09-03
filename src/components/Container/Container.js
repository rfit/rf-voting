import React, {Component, PropTypes} from 'react'

import {Poll} from '../Poll/Poll.component'
import {PostPoll} from '../PostPoll/PostPoll.component'

export class Container extends Component {
  constructor () {
    super()
    // set initial state
    this.state = {
      'selectedItems': [],
      'pollError': false,
      'view': 0
    }
  }

  handleSubmit () {
    if (this.state.selectedItems.length === 3) {
      this.setState({
        view: 1
      })
    } else {
      this.setState({
        'pollError': true
      })
    }
  }

  // handles the selection of projects
  handleItemSelect (id) {
    console.log(this.state)
    const index = this.state.selectedItems.indexOf(id)

    if (index >= 0) {
      // create new array
      let newArray = this.state.selectedItems.slice(0, index)
      newArray = newArray.concat(this.state.selectedItems.slice(index + 1))
      // set new state
      this.setState({
        selectedItems: newArray
      })
    } else if (index === -1) {
      let itemArrayLength = this.state.selectedItems.length
      let newArray = this.state.selectedItems

      switch (true) {
        case (itemArrayLength === 3):
          // remove first item from array
          newArray.shift()

        case (itemArrayLength < 3): // eslint-disable-line
          // add new item to newArray
          newArray = newArray.concat(id)
          // set new state
          this.setState({
            selectedItems: newArray
          })
          break
      }
    }
  }

  render () {
    switch (this.state.view) {
      case 0:
        return <Poll
          items={this.props.items}
          selectedItems={this.state.selectedItems}
          pollError={this.state.pollError}
          submitAction={this.handleSubmit.bind(this)} // eslint-disable-line
          itemSelect={this.handleItemSelect.bind(this)} /> // eslint-disable-line

      case 1:
        return <PostPoll />
    }
  }
}

Container.propTypes = {
  items: PropTypes.array.isRequired
}
