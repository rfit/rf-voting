import React from 'react'

import s from './Thanks.css'

export default class Thanks extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.base}>
          <p>
            We appreciate your time and thoughts, on making a difference.
          </p>
          <p>
            You can read more about {' '}
            <a href="http://www.roskilde-festival.dk/news/2016/who-do-you-think-should-receive-a-donation">
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
    )
  }
}

Thanks.propTypes = {}

