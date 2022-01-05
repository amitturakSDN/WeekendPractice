import { combineReducers } from 'redux';
import { errorReducer } from '@/reducers/ErrorReducer';
import { statusReducer } from '@/reducers/StatusReducer';
import { userReducer } from '@/reducers/UserReducer';
import { homeReducer } from '@/reducers/HomeReducer';
import { scheduleReducer } from './ScheduleReducer';
import { persistReducer } from './PersistReducer';
import { chatReducer } from './ChatReducer';
import { loaderReducer } from './LoaderReducer';
import {profileReducer} from './ProfileReducers'

export const rootReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
  home: homeReducer,
  schedule: scheduleReducer,
  permanentPersist: persistReducer,
  chat: chatReducer,
  loaders: loaderReducer,
  profile: profileReducer,
});
