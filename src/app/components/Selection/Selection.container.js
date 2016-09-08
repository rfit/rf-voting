import { connect } from 'react-redux'
import { getProjectsAsync, selectProject } from '../../actions/selection'
import Selection from './Selection.component'

const mapStateToProps = (state, ownProps) => {
  let shareMultiplier = 3 // We scale the width "vote share" background with this factor
  Object.keys(state.vote.share).forEach(function(itemId) {
    let votePercentage = state.vote.share[itemId] * 100
    shareMultiplier = votePercentage >= 42 ? 1 : shareMultiplier // 50 Looks a bit off
    shareMultiplier = votePercentage >= 25 && shareMultiplier > 2 ? 2 : shareMultiplier // 33 Looks a bit off
  })
  return { // Becomes Props on Selection
    items: state.selection.items,
    selectedItems: state.selection.selectedItems,
    hasVoted: state.vote.hasVoted,
    hasLoggedIn: state.vote.hasLoggedIn,
    showStats: state.vote.showStats,
    shareMultiplier: shareMultiplier,
    share: state.vote.share,
    totals: state.vote.totals
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'getProjectsAsync': () => {
      dispatch(getProjectsAsync())
    },
    'selectProject': (projectId) => {
      dispatch(selectProject(projectId))
    }
  }
}

const SelectionProjects = connect(
  mapStateToProps,
  mapDispatchToProps
)(Selection)

export default SelectionProjects
