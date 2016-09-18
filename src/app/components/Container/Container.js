import React from 'react'

import s from './Container.css'

import SelectionProjects from '../Selection/Selection.container'
import Vote from '../Vote/Vote.container'


export class Container extends React.Component {
  render () {
    return <div className={s.root}>
        <SelectionProjects />
        <Vote />
    </div>
  }
}
