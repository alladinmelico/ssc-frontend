import {
  ALL_COURSES_REQUEST,
  ALL_COURSES_SUCCESS,
  ALL_COURSES_FAIL,
  ADMIN_COURSES_REQUEST,
  ADMIN_COURSES_SUCCESS,
  ADMIN_COURSES_FAIL,
  NEW_COURSE_REQUEST,
  NEW_COURSE_SUCCESS,
  NEW_COURSE_RESET,
  NEW_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_RESET,
  DELETE_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_RESET,
  UPDATE_COURSE_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/courseConstants"

export const coursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSES_REQUEST:
    case ADMIN_COURSES_REQUEST:
      return {
        loading: true,
        courses: [],
      }

    case ALL_COURSES_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        coursesCount: action.payload.coursesCount,
        resPerPage: action.payload.resPerPage,
        filteredSubjectsCount: action.payload.filteredSubjectsCount,
      }

    case ADMIN_COURSES_SUCCESS:
      return {
        loading: false,
        courses: action.payload.data,
        count: action.payload.meta.total
      }

    case ALL_COURSES_FAIL:
    case ADMIN_COURSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const newCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case NEW_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_COURSE_SUCCESS:
      return {
        loading: false,
        success: true,
        course: action.payload.data,
      }

    case NEW_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case NEW_COURSE_RESET:
      return {
        ...state,
        success: false,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const courseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
    case UPDATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_COURSE_FAIL:
    case UPDATE_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_COURSE_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case UPDATE_COURSE_RESET:
      return {
        ...state,
        isUpdated: false,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      }

    case COURSE_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
