import { SUBMIT_VOTE, SHOW_STATS, USER_LOGGED_IN, TOGGLE_THANKS } from '../constants';

let voteInitialState = {
  hasVoted: false,
  hasLoggedIn: false,
  showStats: false,
  fbResponse: {},
  share: {},
  totals: {},
  thanksOpen: false,
}

export default function vote(state = voteInitialState, action) {
  switch (action.type) {
    case SUBMIT_VOTE:
      return {
        ...state,
        hasVoted: true,
        thanksOpen: true
      }

    case SHOW_STATS:
      return {
        ...state,
        showStats: true,
        share: action.payload.share,
        totals: action.payload.totals
      }

    case USER_LOGGED_IN:
      let fbResponse = action.payload.fbResponse
      let isValidResponse = typeof action.payload.fbResponse['userID'] === 'string'
      let customFbResponse = {
        userID: fbResponse.userID,
        email: fbResponse.email,
        name: fbResponse.name,
        picture: fbResponse.picture
      }
      return {
        ...state,
        hasLoggedIn: isValidResponse,
        fbResponse: customFbResponse
      }

    case TOGGLE_THANKS:
      return {
        ...state,
        thanksOpen: !state.thanksOpen
      }

    default:
      return state
  }
}
