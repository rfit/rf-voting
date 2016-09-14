import React from 'react'

import s from './Block.css'

export default class Block extends React.Component {
  toggleHover(tt){
    console.log(tt) //TODO fix toggle
    console.log(tt.target) //TODO fix toggle
  }

  render() {
    let { label, isSelected, clickHandler } = this.props
    let cssClass = isSelected ? s.rowChosen : s.row
    return (
      <div className={cssClass} onClick={clickHandler} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <span className={s.header}>
          {label}
        </span>
      </div>
    )
  }
}

Block.propTypes = {
  label: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  clickHandler: React.PropTypes.func.isRequired
}
