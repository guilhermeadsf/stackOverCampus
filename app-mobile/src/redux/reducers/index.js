import { combineReducers } from 'redux';
import UserDataReducer from './UserDataReducer';
import Posts from './posts';

const rootReducer = combineReducers({
  UserDataReducer,
  Posts
});

export default (state, action) =>
  action.type === 'RESET_STORE'
    ? rootReducer(undefined, action)
    : rootReducer(state, action);
