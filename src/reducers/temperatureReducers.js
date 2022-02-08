import {
  ALL_TEMPERATURES_REQUEST,
  ALL_TEMPERATURES_SUCCESS,
  ALL_TEMPERATURES_FAIL,
  ADMIN_TEMPERATURES_REQUEST,
  ADMIN_TEMPERATURES_SUCCESS,
  ADMIN_TEMPERATURES_FAIL,
  NEW_TEMPERATURE_REQUEST,
  NEW_TEMPERATURE_SUCCESS,
  NEW_TEMPERATURE_RESET,
  NEW_TEMPERATURE_FAIL,
  DELETE_TEMPERATURE_REQUEST,
  DELETE_TEMPERATURE_SUCCESS,
  DELETE_TEMPERATURE_RESET,
  DELETE_TEMPERATURE_FAIL,
  UPDATE_TEMPERATURE_REQUEST,
  UPDATE_TEMPERATURE_SUCCESS,
  UPDATE_TEMPERATURE_RESET,
  UPDATE_TEMPERATURE_FAIL,
  TEMPERATURE_DETAILS_REQUEST,
  TEMPERATURE_DETAILS_SUCCESS,
  TEMPERATURE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/temperatureConstants"

export const temperaturesReducer = (state = { temperatures: [] }, action) => {
  switch (action.type) {
    case ALL_TEMPERATURES_REQUEST:
    case ADMIN_TEMPERATURES_REQUEST:
      return {
        loading: true,
        temperatures: [],
      }

    case ALL_TEMPERATURES_SUCCESS:
      return {
        loading: false,
        temperatures: action.payload.temperatures,
        temperaturesCount: action.payload.temperaturesCount,
        resPerPage: action.payload.resPerPage,
        filteredSubjectsCount: action.payload.filteredSubjectsCount,
      }

    case ADMIN_TEMPERATURES_SUCCESS:
      return {
        loading: false,
        temperatures: action.payload.data,
        count: action.payload.meta.total
      }

    case ALL_TEMPERATURES_FAIL:
    case ADMIN_TEMPERATURES_FAIL:
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

export const newTemperatureReducer = (state = { temperature: {} }, action) => {
  switch (action.type) {
    case NEW_TEMPERATURE_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_TEMPERATURE_SUCCESS:
      return {
        loading: false,
        success: true,
        temperature: action.payload.data,
      }

    case NEW_TEMPERATURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case NEW_TEMPERATURE_RESET:
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

export const temperatureReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TEMPERATURE_REQUEST:
    case UPDATE_TEMPERATURE_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case DELETE_TEMPERATURE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_TEMPERATURE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_TEMPERATURE_FAIL:
    case UPDATE_TEMPERATURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_TEMPERATURE_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case UPDATE_TEMPERATURE_RESET:
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

export const temperatureDetailsReducer = (state = { temperature: {} }, action) => {
  switch (action.type) {
    case TEMPERATURE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case TEMPERATURE_DETAILS_SUCCESS:
      return {
        loading: false,
        temperature: action.payload,
      }

    case TEMPERATURE_DETAILS_FAIL:
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
