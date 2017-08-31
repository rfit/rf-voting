import React from 'react'
import FacebookLogin from 'react-facebook-login'
import FontAwesome from 'react-fontawesome'
import ToggleDisplay from 'react-toggle-display'

import s from './Login.css'

export default class Login extends React.Component {
  render () {
    let appId = process.env.NODE_ENV === 'production' ? '127383827888719' : '698595986992783' // Dev: 698595986992783, Prod: 127383827888719
    let { hasVoted, hasLoggedIn, username, picture, onUserLogin } = this.props

    let firstName = username.split(' ')[0]
    return (
      <div className={s.root}>
        <ToggleDisplay show={hasLoggedIn}>
          <button className={s.base}>
            <div className={s.text}>
              <ToggleDisplay show={!hasVoted}>
                <div>
                  <i>
                    <FontAwesome name='facebook'/>
                  </i>
                </div>
              </ToggleDisplay>
              <div>
                {hasVoted ? 'Thanks ' + firstName + '!' : 'Voting as ' + username}
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

