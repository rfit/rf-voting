import React from 'react'

import s from './Submit.css'

export default class Submit extends React.Component {
  render() {
    let { selectionIsValid, hasVoted, hasLoggedIn, validClickHandler } = this.props
    let canVote = selectionIsValid && !hasVoted && hasLoggedIn

    let buttonLbl = canVote ? 'Cast your vote!' : 'Select three projects'
    buttonLbl = !selectionIsValid && !hasLoggedIn ? 'Select three projects and login with facebook' : buttonLbl
    buttonLbl = selectionIsValid && !hasLoggedIn ? 'Please login with facebook to register your vote' : buttonLbl
    buttonLbl = hasVoted ? 'Voting...' : buttonLbl
    buttonLbl = hasLoggedIn && hasVoted ? 'Thank you for voting!' : buttonLbl

    let buttonCssClass = hasVoted ? s.finished : ( canVote ? s.enabled : s.informing )
    return (
      <div className={s.root}>
        <button className={buttonCssClass} onClick={() => canVote && validClickHandler()}>
          <div className={s.text}>
            <span>{buttonLbl}</span>
          </div>
        </button>
      </div>
    )
  }
}

Submit.propTypes = {
  selectionIsValid: React.PropTypes.bool,
  hasVoted: React.PropTypes.bool,
  hasLoggedIn: React.PropTypes.bool,
  validClickHandler: React.PropTypes.func
}

