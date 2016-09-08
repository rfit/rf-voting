import React, {Component, PropTypes} from 'react'

import FacebookLogin from 'react-facebook-login';
import FontAwesome from 'react-fontawesome'

export default class VoteSubmit extends Component {
  constructor() {
    super()
  }
  render() {
    let { selectedItems, fbResponse } = this.props
    let { submitVoteAsync, userLoggedInAsync } = this.props
    let { hasVoted, hasLoggedIn } = this.props

    let hasSelectedThree = selectedItems.length === 3
    let canVote = hasSelectedThree && !hasVoted && hasLoggedIn

    let buttonText = canVote ? 'Cast your vote!' : 'Select three projects'
    buttonText = !hasSelectedThree && !hasLoggedIn ? 'Select three projects and login with facebook' : buttonText
    buttonText = hasSelectedThree && !hasLoggedIn ? 'Please login with facebook to register your vote' : buttonText
    buttonText = hasVoted ? 'Voting...' : buttonText
    buttonText = hasLoggedIn && hasVoted ? 'Thank you for voting!' : buttonText

    let buttonCssClass = hasVoted ? 'voteSubmitButton voteSubmitButtonActivated' : (canVote ? 'voteSubmitButton voteSubmitButtonEnabled' : 'voteSubmitButton')
    let fbName = typeof fbResponse['name'] === 'string' ? fbResponse['name'] : ''
    let fbPictureSrc = typeof fbResponse['picture'] === 'object' ? fbResponse['picture']['data']['url'] : ''
    let voteLbl = hasVoted ? 'Voted' : 'Voting'
    return (
      <div className='voteSubmitRoot'>
        <div className='selectionLeft'>
          <button className={buttonCssClass} onClick={() => canVote && submitVoteAsync(selectedItems, fbResponse)}>
            <div style={{width: '70%', display: 'inline-block', textAlign: 'center'}}>
              <span>{buttonText}</span>
             </div>
          </button>
        </div>
        <div className='selectionRight'>
          <button className={hasLoggedIn ? 'kep-fb-login' : 'voteSubmitHidden'} style={{position: 'relative'}}
                  onClick={() => hasLoggedIn && hasVoted && userLoggedInAsync(fbResponse)}>
            <div style={{width: '60%', display: 'inline-block', textAlign: 'center'}}>
              <FontAwesome name='facebook' size='lg' style={{verticalAlign: 'top'}}/>
              <span style={{zIndex: '50'}}>{voteLbl} as {fbName}</span>
            </div>
            <img src={fbPictureSrc} style={{right: '12px', top: '6px', position: 'absolute'}} />
          </button>

          <FacebookLogin
            appId='1746188185654658'
            autoLoad={true}
            fields='name,email,picture'
            callback={userLoggedInAsync}
            cssClass={hasLoggedIn ? 'voteSubmitHidden' : 'kep-fb-login'}
            icon='fa-facebook'
          />
        </div>
      </div>
    )
  }
}
