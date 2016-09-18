import React from 'react'

import FacebookLogin from 'react-facebook-login';
import FontAwesome from 'react-fontawesome'
import ToggleDisplay from 'react-toggle-display';

//TODO get app id from config. Can we get an RF account @ FB?

import s from './Vote.css'

export default class VoteSubmit extends React.Component {
  render() {
    let { selectedItems, fbResponse, hasVoted, hasLoggedIn, fbName, fbPictureSrc } = this.props
    let { submitVoteAsync, userLoggedInAsync } = this.props

    let hasSelectedThree = selectedItems.length === 3
    let canVote = hasSelectedThree && !hasVoted && hasLoggedIn

    let buttonLbl = canVote ? 'Cast your vote!' : 'Select three projects'
    buttonLbl = !hasSelectedThree && !hasLoggedIn ? 'Select three projects and login with facebook' : buttonLbl
    buttonLbl = hasSelectedThree && !hasLoggedIn ? 'Please login with facebook to register your vote' : buttonLbl
    buttonLbl = hasVoted ? 'Voting...' : buttonLbl
    buttonLbl = hasLoggedIn && hasVoted ? 'Thank you for voting!' : buttonLbl

    let buttonCssClass = hasVoted ? s.voteButtonFinished : ( canVote ? s.voteButtonEnabled : s.voteButton )
    let voteLbl = hasVoted ? 'Voted' : 'Voting'
    return (
      <div className={s.root}>
        <div className={s.left}>
          <button className={buttonCssClass} onClick={() => canVote && submitVoteAsync(selectedItems, fbResponse)}>
            <div className={s.voteButtonText}>
              <span>{buttonLbl}</span>
             </div>
          </button>
        </div>
        <div className={s.right}>
          <ToggleDisplay show={hasLoggedIn}>
            <button className={s.fbLogin}>
              <div className={s.fbText}>
                <div>
                  <i>
                    <FontAwesome name='facebook' className={s.fbIcon}/>
                  </i>
                </div>
                <div>
                  {voteLbl} as {fbName}
                </div>
                <div>
                  <img className={s.fbPic} src={fbPictureSrc} />
                </div>
              </div>
            </button>
          </ToggleDisplay>
          <ToggleDisplay show={!hasLoggedIn}>
            <FacebookLogin cssClass={s.fbLoginActive} appId='1746188185654658' autoLoad={true} fields='name,email,picture' callback={userLoggedInAsync} icon='fa-facebook' />
          </ToggleDisplay>
        </div>
      </div>
    )
  }
}

VoteSubmit.propTypes = {
  selectedItems: React.PropTypes.arrayOf(React.PropTypes.string),
  fbResponse: React.PropTypes.object,
  hasVoted: React.PropTypes.bool.isRequired,
  hasLoggedIn: React.PropTypes.bool.isRequired,
  submitVoteAsync: React.PropTypes.func.isRequired,
  userLoggedInAsync: React.PropTypes.func.isRequired
}
