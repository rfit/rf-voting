import { combineReducers } from 'redux';
import selection from './selection';
import vote from './vote';

const rootReducer = combineReducers({
  selection,
  vote
})

export default rootReducer;
