import { SUBMIT_VOTE, SHOW_STATS, USER_LOGGED_IN, TOGGLE_THANKS } from '../constants';
import { setSelectedProjects } from './selection'
import fetch from 'isomorphic-fetch'
import { statusCheck, jsonParse, requestFailed } from './async.utils'

export function submitVote( selectedItems ) {
  return {
    type: SUBMIT_VOTE,
    payload: {
      selectedItems
    },
  };
}

export function showStats( share, totals ) {
  return {
    type: SHOW_STATS,
    payload: {
      share,
      totals
    },
  };
}

export function userLoggedIn(fbResponse ) {
  return {
    type: USER_LOGGED_IN,
    payload: {
      fbResponse
    },
  };
}

export function toggleThanks( ) {
  return {
    type: TOGGLE_THANKS,
    payload: {},
  };
}

export function userLoggedInAsync( fbResponse ) {
  return dispatch => {
    dispatch(userLoggedIn(fbResponse))
    let data = JSON.stringify({fbResponse})
    let requestOptions = {
      method: 'post',
      body: data
    }
    return fetch(`/api/login.json`, requestOptions)
      .then(statusCheck)
      .then(jsonParse)
      .then((data => {
        if( data.selectedItems && data.share && data.totals ) {
          dispatch(submitVote(data.selectedItems)) // Internal version, render submitted voted (does not send to backend)
          dispatch(setSelectedProjects(data.selectedItems))
          dispatch(showStats(data.share, data.totals))
        }
      })).catch(requestFailed)
  }
}

export function submitVoteAsync(selectedItems, fbResponse) {
  return dispatch => {
    dispatch(submitVote(selectedItems))
    let data = JSON.stringify({
      items: selectedItems,
      fbResponse
    })
    let requestOptions = {
      method: 'post',
      body: data
    }
    return fetch(`/api/vote.json`, requestOptions)
      .then(statusCheck)
      .then(jsonParse)
      .then((data => {
        console.log(data)
        dispatch(showStats(data.share, data.totals))
      })).catch(requestFailed)
  }
}
