import React from 'react'
import FacebookLogin from 'react-facebook-login'
import FontAwesome from 'react-fontawesome'
import ToggleDisplay from 'react-toggle-display'

import s from './Login.css'

export default class Login extends React.Component {
  render() {
    let appId = '690824064405896' // TODO get from backend on mount?   1746188185654658
    let { hasVoted, hasLoggedIn, username, picture, onUserLogin } = this.props

    return (
      <div className={s.root}>
        <ToggleDisplay show={hasLoggedIn}>
          <button className={s.base}>
            <div className={s.text}>
              <div>
                <i>
                  <FontAwesome name='facebook'/>
                </i>
              </div>
              <div>
                {hasVoted ? 'Voted' : 'Voting'} as {username}
              </div>
              <div>
                <img className={s.pic} src={picture} />
              </div>
            </div>
          </button>
        </ToggleDisplay>
        <ToggleDisplay show={!hasLoggedIn}>
          <FacebookLogin cssClass={s.active} appId={appId} autoLoad={true} fields='name,email,picture' callback={onUserLogin} icon='fa-facebook' />
        </ToggleDisplay>
      </div>
    )
  }
}

Login.propTypes = {
  hasVoted: React.PropTypes.bool,
  hasLoggedIn: React.PropTypes.bool,
  username: React.PropTypes.string,
  picture: React.PropTypes.string,
  onUserLogin: React.PropTypes.func
}

