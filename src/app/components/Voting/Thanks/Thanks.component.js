import React from 'react'

import ToggleDisplay from 'react-toggle-display'
import FontAwesome from 'react-fontawesome'
import s from './Thanks.css'

export default class Thanks extends React.Component {
  render() {
    let { isShown, closeHandler } = this.props
    return (
      <div className={s.root}>
        <ToggleDisplay show={isShown}>
          <div className={s.base}>
            <div className={s.toggle} onClick={closeHandler}>
              <FontAwesome name='times-circle' size='2x' />
            </div>
            <div className={s.thanks}>
              <p>
                We appreciate your time and thoughts, on making a difference.
              </p>
              <p>
                You can read more about {' '}
                <a className={s.link} href="http://www.roskilde-festival.dk/news/2016/who-do-you-think-should-receive-a-donation">
                  Your Donations right here
                </a>
                , and make sure to have your say next year!
                <span className={s.nonprofit}>
                  <img src='RF16_NON_PROFIT_logo_canopy_orange_RGB_150915.png' />
                </span>
              </p>
              <p>
                Best Regards
                <br/><br/>
                <span className={s.signature}>
                Roskilde Festival Society
              </span>
              </p>
            </div>
          </div>
        </ToggleDisplay>
      </div>
    )
  }
}

Thanks.propTypes = {
  isShown: React.PropTypes.bool.isRequired,
  closeHandler: React.PropTypes.func.isRequired
}

