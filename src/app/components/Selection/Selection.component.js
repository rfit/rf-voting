import React from 'react'
import Block from './Block/Block.component'
import Stats from './Stats/Stats.component'

import s from './Selection.css'

export default class Selection extends React.Component {
  componentDidMount() {
    this.props.getProjectsAsync()
  }

  render() {
    let { items, selectedItems, share, totals } = this.props
    let { hasVoted, showStats, shareMultiplier } = this.props
    let { selectProject } = this.props

    return (
      <div className={s.root}>
        {
          items.map((project) => {
            let { id, name } = project
            return (
              <div key={id} className={s.project}>
                <div className={s.left}>
                  <Block label={name} isSelected={selectedItems.includes(id)} clickHandler={(e) => !hasVoted && selectProject(id)}/>
                </div>
                <div className={showStats ? s.right : s.hideRight}>
                  <Stats shareMultiplier={shareMultiplier} share={share[id]} total={totals[id]} />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

Selection.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selectedItems: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  share: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
  totals: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
  hasVoted: React.PropTypes.bool.isRequired,
  showStats: React.PropTypes.bool.isRequired,
  shareMultiplier: React.PropTypes.number.isRequired,
  selectProject: React.PropTypes.func.isRequired
}
