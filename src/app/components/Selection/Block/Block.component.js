import React from 'react'

import s from './Block.css'

export default class Block extends React.Component {
  render() {
    let { label, isSelected, clickHandler } = this.props
    let cssClass = isSelected ? s.rowChosen : s.row
    return (
      <div className={cssClass} onClick={clickHandler}>
        <div className={s.flex}>
          <div className={s.header}>
            {label}
          </div>
        </div>
      </div>
    )
  }
}

Block.propTypes = {
  label: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  clickHandler: React.PropTypes.func.isRequired
}
