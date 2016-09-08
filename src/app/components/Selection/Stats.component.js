import React, {Component, PropTypes} from 'react'

import FontAwesome from 'react-fontawesome'

export default class Stats extends Component {
  constructor() {
    super()
  }

  render() {
    let { show } = this.props
    if (!show)
      return <div></div>

    let { share, total, shareMultiplier } = this.props
    let sharePercentage = (share * 100).toFixed(1)
    let shareWidth = (share * 100 * shareMultiplier).toFixed(0) + '%'
    return (
      <div className='statsRoot'>
        <div className='statsShare' style={{width: shareWidth}} />
        <div className='statsText'>
          {total + ' '}
          <FontAwesome name='thumbs-o-up' size='lg'/>
        </div>
        <div className='statsText'>
          {sharePercentage} {'%'}
        </div>
      </div>
    )
  }
}
