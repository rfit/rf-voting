import { SET_PROJECTS, SELECT_PROJECT, SET_SELECTED_PROJECTS } from '../constants';
import { statusCheck, jsonParse, requestFailed } from './async.utils'

export function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    payload: { projects }
  }
}
export function selectProject(id) {
  return {
    type: SELECT_PROJECT,
    payload: { id }
  }
}

export function setSelectedProjects(items) {
  return {
    type: SET_SELECTED_PROJECTS,
    payload: { items }
  }
}

export function getProjectsAsync() {
  return dispatch => {
    return fetch(`/projects.json`)
      .then(statusCheck)
      .then(jsonParse)
      .then((projectData => {
        dispatch(setProjects(projectData))
      })).catch(requestFailed)
  }
}
