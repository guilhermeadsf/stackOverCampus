import { combineReducers } from 'redux';
import UserDataReducer from './UserDataReducer';

const rootReducer = combineReducers({
  UserDataReducer
});

export default (state, action) =>
  action.type === 'RESET_STORE'
    ? rootReducer(undefined, action)
    : rootReducer(state, action);
