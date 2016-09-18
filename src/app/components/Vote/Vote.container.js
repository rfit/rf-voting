import { connect } from 'react-redux'
import { getProjectsAsync } from '../../actions/selection'
import { submitVoteAsync, userLoggedInAsync } from '../../actions/vote'
import VoteSubmit from './VoteSubmit.component'

const mapStateToProps = (state, ownProps) => {
  let fbResponse = state.vote.fbResponse
  return { // Becomes Props on Selection
    hasVoted: state.vote.hasVoted,
    selectedItems: state.selection.selectedItems,
    hasLoggedIn: state.vote.hasLoggedIn,
    fbResponse: fbResponse,
    fbName: fbResponse['name'] ? fbResponse['name'] : '',
    fbPictureSrc: typeof fbResponse['picture'] === 'object' ? fbResponse['picture']['data']['url'] : '',

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'getProjectsAsync': () => {
      dispatch(getProjectsAsync())
    },
    'submitVoteAsync': (selectedItems, fbResponse) => {
      dispatch(submitVoteAsync(selectedItems, fbResponse))
    },
    'userLoggedInAsync': (fbResponse) => {
      dispatch(userLoggedInAsync(fbResponse))
    }
  }
}

const Vote = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteSubmit)

export default Vote
