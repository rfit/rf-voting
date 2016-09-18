import { SET_PROJECTS, SELECT_PROJECT, SET_SELECTED_PROJECTS } from '../constants';

function resultingSelectedItems(state, itemId) { // Toggle selected projects emulating a stack (toggling most recent selection if user indicates a fourth choice)
  let selectedItems = []
  const indexSelected = state.selectedItems.indexOf(itemId)
  if (indexSelected < 0) { // id not currently selected
    if (state.selectedItems.length === 3) { // we make room if necessary
      selectedItems = state.selectedItems.slice(0, 2) // Pop stack (the result of)
      selectedItems.push(itemId) // Push onto stack
    } else {
      selectedItems = state.selectedItems.concat(itemId)  // Push onto stack (concat since we directly copy of state)
    }
  } else { // id checked, uncheck it
    let wereNotClicked = (checkedId) => {
      return checkedId !== itemId
    }
    selectedItems = state.selectedItems.filter(wereNotClicked)
  }
  return selectedItems
}

let selectionInitialState = {
  items: [],
  selectedItems: [],
  lockSelection: false
}

export default function selection(state = selectionInitialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        items: action.payload.projects
      }

    case SELECT_PROJECT:
      return {
        ...state,
        selectedItems: resultingSelectedItems(state, action.payload.id)
      }

    case SET_SELECTED_PROJECTS:
      return {
        ...state,
        selectedItems: action.payload.items
      }

    default:
      return state
  }
}
