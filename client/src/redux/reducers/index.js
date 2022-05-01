import { combineReducers } from 'redux';

import { errorsReducer } from './errorsReducer';
import { authReducer } from './authReducer';
import { profileReducer } from './profileReducer';
import { postReducer } from './postReducer';

const rootReducer = combineReducers({
  errors: errorsReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
});

export default rootReducer;
