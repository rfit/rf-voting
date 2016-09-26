import React from 'react'

import s from './Container.css'

import SelectionProjects from '../Selection/Selection.container'
import Voting from '../Voting/Voting.container'


export class Container extends React.Component {
  render () {
    return <div className={s.root}>
        <SelectionProjects />
        <Voting />
    </div>
  }
}
