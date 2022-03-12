import {
  ALL_CLASSROOMS_REQUEST,
  ALL_CLASSROOMS_SUCCESS,
  ALL_CLASSROOMS_FAIL,
  ADMIN_CLASSROOMS_REQUEST,
  ADMIN_CLASSROOMS_SUCCESS,
  ADMIN_CLASSROOMS_FAIL,
  NEW_CLASSROOM_REQUEST,
  NEW_CLASSROOM_SUCCESS,
  NEW_CLASSROOM_RESET,
  NEW_CLASSROOM_FAIL,
  DELETE_CLASSROOM_REQUEST,
  DELETE_CLASSROOM_SUCCESS,
  DELETE_CLASSROOM_RESET,
  DELETE_CLASSROOM_FAIL,
  UPDATE_CLASSROOM_REQUEST,
  UPDATE_CLASSROOM_SUCCESS,
  UPDATE_CLASSROOM_RESET,
  UPDATE_CLASSROOM_FAIL,
  CLASSROOM_DETAILS_REQUEST,
  CLASSROOM_DETAILS_SUCCESS,
  CLASSROOM_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/classroomConstants"

export const classroomsReducer = (state = { classrooms: [] }, action) => {
  switch (action.type) {
    case ALL_CLASSROOMS_REQUEST:
    case ADMIN_CLASSROOMS_REQUEST:
      return {
        loading: true,
        classrooms: state.classrooms,
      }

    case ALL_CLASSROOMS_SUCCESS:
    case ADMIN_CLASSROOMS_SUCCESS:
      return {
        loading: false,
        classrooms: action.payload.data,
        count: action.payload.meta.total
      }

    case ALL_CLASSROOMS_FAIL:
    case ADMIN_CLASSROOMS_FAIL:
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

export const newClassroomReducer = (state = { classroom: {} }, action) => {
  switch (action.type) {
    case NEW_CLASSROOM_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_CLASSROOM_SUCCESS:
      return {
        loading: false,
        success: true,
        classroom: action.payload.data,
      }

    case NEW_CLASSROOM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case NEW_CLASSROOM_RESET:
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

export const classroomReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CLASSROOM_REQUEST:
    case UPDATE_CLASSROOM_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case DELETE_CLASSROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_CLASSROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_CLASSROOM_FAIL:
    case UPDATE_CLASSROOM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CLASSROOM_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case UPDATE_CLASSROOM_RESET:
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

export const classroomDetailsReducer = (state = { classroom: {} }, action) => {
  switch (action.type) {
    case CLASSROOM_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case CLASSROOM_DETAILS_SUCCESS:
      return {
        loading: false,
        classroom: action.payload,
      }

    case CLASSROOM_DETAILS_FAIL:
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
