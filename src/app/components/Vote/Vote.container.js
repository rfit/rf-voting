import { connect } from 'react-redux'
import { getProjectsAsync } from '../../actions/selection'
import { submitVoteAsync, userLoggedInAsync } from '../../actions/vote'
import VoteSubmit from './VoteSubmit.component'

const mapStateToProps = (state, ownProps) => {
  return { // Becomes Props on Selection
    hasVoted: state.vote.hasVoted,
    selectedItems: state.selection.selectedItems,
    hasLoggedIn: state.vote.hasLoggedIn,
    fbResponse: state.vote.fbResponse
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
