import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import {
  subjectsReducer,
  newSubjectReducer,
  subjectReducer,
  subjectDetailsReducer,
} from "./reducers/subjectReducers"
import {
  schedulesReducer,
  newScheduleReducer,
  scheduleReducer,
  scheduleDetailsReducer,
} from "./reducers/scheduleReducers"
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducers"

const reducer = combineReducers({

  // subjects
  subjects: subjectsReducer,
  subjectDetails: subjectDetailsReducer,
  newSubject: newSubjectReducer,
  subject: subjectReducer,

  // schedules
  schedules: schedulesReducer,
  scheduleDetails: scheduleDetailsReducer,
  newSchedule: newScheduleReducer,
  schedule: scheduleReducer,


  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer
})

const middleware = [thunk]
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
