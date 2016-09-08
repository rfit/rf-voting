import React, {Component, PropTypes} from 'react'
import Stats from './Stats.component'

export default class Selection extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getProjectsAsync()
  }

  render() {
    let { items } = this.props
    let { selectedItems, selectProject } = this.props
    let { hasVoted, showStats } = this.props
    let { share, totals, shareMultiplier } = this.props
    return (
      <div className='selectionRoot'>
        {
          items.map((item) => {
            let { id } = item
            let { name } = item
            let itemCssClass = selectedItems.indexOf(item.id) > -1 ? 'selectionBlock selectionChosen' : 'selectionBlock'
            return (
              <div key={id}>
                <div className='selectionLeft'>
                  <div className={itemCssClass}
                       onClick={!hasVoted ? () => selectProject(id) : () => {}} >
                    <span className='selectionHeader'>
                      {name}
                    </span>
                  </div>
                </div>
                <div className='selectionRight'>
                  <Stats show={showStats} shareMultiplier={shareMultiplier} share={share[id]} total={totals[id]}>
                  </Stats>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
