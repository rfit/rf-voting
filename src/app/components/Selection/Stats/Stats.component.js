import React from 'react'
import FontAwesome from 'react-fontawesome'

import ToggleDisplay from 'react-toggle-display';

import s from './Stats.css'

export default class Stats extends React.Component {
  render() {
    let { share, total, shareMultiplier } = this.props
    total = total || 0
    share = share || 0
    let sharePercentage = (share * 100).toFixed(1)
    let shareWidth = (share * 100 * shareMultiplier).toFixed(0) + '%'
    return (
      <div className={s.root}>
        <div className={s.share} style={{width: shareWidth}} />
          <div className={s.statTL}>
            {total + ' '}
            <FontAwesome name='thumbs-o-up'/>
          </div>
          <div className={s.statBL}>
            {sharePercentage} {'%'}
          </div>
      </div>
    )
  }
}

Stats.propTypes = {
  share: React.PropTypes.number,
  total: React.PropTypes.number,
  shareMultiplier: React.PropTypes.number
}

