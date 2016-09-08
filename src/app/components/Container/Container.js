import React, {Component} from 'react'

import SelectionProjects from '../Selection/Selection.container'
import Vote from '../Vote/Vote.container'

export class Container extends Component {
  constructor () {
    super()
  }

  render () {
    return <div className='containerRoot'>
        <SelectionProjects />
        <Vote />
    </div>
  }
}
