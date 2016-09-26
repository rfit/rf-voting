import { connect } from 'react-redux'
import { submitVoteAsync, userLoggedInAsync, toggleThanks } from '../../actions/vote'
import Vote from './Vote.component'

const mapStateToProps = (state, ownProps) => {
  let fbResponse = state.vote.fbResponse
  return { // Becomes Props on Selection
    hasVoted: state.vote.hasVoted,
    selectedItems: state.selection.selectedItems,
    hasLoggedIn: state.vote.hasLoggedIn,
    fbResponse: fbResponse,
    fbName: fbResponse['name'] ? fbResponse['name'] : '',
    fbPictureSrc: typeof fbResponse['picture'] === 'object' ? fbResponse['picture']['data']['url'] : '',
    thanksOpen: state.vote.thanksOpen,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'submitVoteAsync': (selectedItems, fbResponse) => {
      dispatch(submitVoteAsync(selectedItems, fbResponse))
    },
    'userLoggedInAsync': (fbResponse) => {
      dispatch(userLoggedInAsync(fbResponse))
    },
    'toggleThanks': () => {
      dispatch(toggleThanks())
    }
  }
}

const Voting = connect(
  mapStateToProps,
  mapDispatchToProps
)(Vote)

export default Voting
