import React from 'react'


import Submit from './Submit/Submit.component'
import Login from './Login/Login.component'
import Thanks from './Thanks/Thanks.component'

//TODO get app id from config or from backend? Can we get an RF account @ FB?

import s from './Vote.css'

export default class Vote extends React.Component {

  render() {
    let { selectedItems, fbResponse, hasVoted, hasLoggedIn, fbName, fbPictureSrc, thanksOpen } = this.props
    let { submitVoteAsync, userLoggedInAsync, toggleThanks } = this.props

    let hasSelectedThree = selectedItems.length === 3
    let canVote = hasSelectedThree && !hasVoted && hasLoggedIn

    let validClickBeforeVoting = () => {canVote && submitVoteAsync(selectedItems, fbResponse)}
    let onValidClick = hasVoted ? toggleThanks : validClickBeforeVoting

    return (
      <div className={s.root}>
          <div className={s.wrapper}>
            <div className={s.left}>
              <Submit selectionIsValid={hasSelectedThree} hasVoted={hasVoted} hasLoggedIn={hasLoggedIn} validClickHandler={onValidClick} />
            </div>
            <div className={s.right}>
              <Login hasLoggedIn={hasLoggedIn} hasVoted={hasVoted} username={fbName} picture={fbPictureSrc} onUserLogin={userLoggedInAsync} />
            </div>
            <span className={s.relative}>
              <Thanks isShown={hasVoted && thanksOpen} closeHandler={toggleThanks} />
            </span>
        </div>
      </div>
    )
  }
}

Vote.propTypes = {
  selectedItems: React.PropTypes.arrayOf(React.PropTypes.string),
  fbResponse: React.PropTypes.object,
  hasVoted: React.PropTypes.bool.isRequired,
  hasLoggedIn: React.PropTypes.bool.isRequired,
  fbName: React.PropTypes.string,
  fbPictureSrc: React.PropTypes.string,
  submitVoteAsync: React.PropTypes.func.isRequired,
  userLoggedInAsync: React.PropTypes.func.isRequired,
  toggleThanks: React.PropTypes.func.isRequired
}
