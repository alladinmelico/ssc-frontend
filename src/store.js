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
  facilitiesReducer,
  newFacilityReducer,
  facilityReducer,
  facilityDetailsReducer,
} from "./reducers/facilityReducers"

import {
  coursesReducer,
  newCourseReducer,
  courseReducer,
  courseDetailsReducer,
} from "./reducers/courseReducers"

// import {
//   facilitiesReducer,
//   newFacilityReducer,
//   facilityReducer,
//   facilityDetailsReducer,
// } from "./reducers/facilityReducers"

import {
  sectionsReducer,
  newSectionReducer,
  sectionReducer,
  sectionDetailsReducer,
} from "./reducers/sectionReducers"

import {
  schedulesReducer,
  newScheduleReducer,
  scheduleReducer,
  scheduleDetailsReducer,
} from "./reducers/scheduleReducers"

import {
  rfidsReducer,
  newRfidReducer,
  rfidReducer,
  rfidDetailsReducer,
} from "./reducers/rfidReducers"

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

  // facility
  facilities: facilitiesReducer,
  facilityDetails: facilityDetailsReducer,
  newFacility: newFacilityReducer,
  facility: facilityReducer,

  // course
  courses: coursesReducer,
  courseDetails: courseDetailsReducer,
  newCourse: newCourseReducer,
  course: courseReducer,

  // sections
  sections: sectionsReducer,
  sectionDetails: sectionDetailsReducer,
  newSection: newSectionReducer,
  section: sectionReducer,

  // schedules
  schedules: schedulesReducer,
  scheduleDetails: scheduleDetailsReducer,
  newSchedule: newScheduleReducer,
  schedule: scheduleReducer,

  // rfid
  rfids: rfidsReducer,
  rfidDetails: rfidDetailsReducer,
  newRfid: newRfidReducer,
  rfid: rfidReducer,

  //auth
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
