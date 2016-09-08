import { SUBMIT_VOTE, SHOW_STATS, USER_LOGGED_IN } from '../constants';

let voteInitialState = {
  hasVoted: false,
  hasLoggedIn: false,
  showStats: false,
  fbResponse: {},
  share: {},
  totals: {}
}

export default function vote(state = voteInitialState, action) {
  switch (action.type) {
    case SUBMIT_VOTE:
      return Object.assign({}, state,
        { hasVoted: true }
      )

    case SHOW_STATS:
      return Object.assign({}, state,
        {
          showStats: true,
          share: action.payload.share,
          totals: action.payload.totals
        }
      )

    case USER_LOGGED_IN:
      let fbResponse = action.payload.fbResponse
      let isValidResponse = typeof action.payload.fbResponse['userID'] === 'string'
      let customFbResponse = {
        userID: fbResponse.userID,
        email: fbResponse.email,
        name: fbResponse.name,
        picture: fbResponse.picture
      }
      return Object.assign({}, state,
        {
          hasLoggedIn: isValidResponse,
          fbResponse: customFbResponse
        }
      )

    default:
      return state;
  }
}
