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
              <FontAwesome name='times-circle' size='lg' />
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
              </p>
              <p>
                Best Regards
              </p>
              <p>
                Roskilde Festival Society
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

