import {
  ALL_RFIDS_REQUEST,
  ALL_RFIDS_SUCCESS,
  ALL_RFIDS_FAIL,
  ADMIN_RFIDS_REQUEST,
  ADMIN_RFIDS_SUCCESS,
  ADMIN_RFIDS_FAIL,
  NEW_RFID_REQUEST,
  NEW_RFID_SUCCESS,
  NEW_RFID_RESET,
  NEW_RFID_FAIL,
  DELETE_RFID_REQUEST,
  DELETE_RFID_SUCCESS,
  DELETE_RFID_RESET,
  DELETE_RFID_FAIL,
  UPDATE_RFID_REQUEST,
  UPDATE_RFID_SUCCESS,
  UPDATE_RFID_RESET,
  UPDATE_RFID_FAIL,
  RFID_DETAILS_REQUEST,
  RFID_DETAILS_SUCCESS,
  RFID_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/rfidConstants"

export const rfidsReducer = (state = { rfids: [] }, action) => {
  switch (action.type) {
    case ALL_RFIDS_REQUEST:
    case ADMIN_RFIDS_REQUEST:
      return {
        loading: true,
        rfids: state.rfids,
      }

    case ALL_RFIDS_SUCCESS:
      return {
        loading: false,
        rfids: action.payload.rfids,
        rfidsCount: action.payload.rfidsCount,
        resPerPage: action.payload.resPerPage,
        filteredRfidsCount: action.payload.filteredRfidsCount,
      }

    case ADMIN_RFIDS_SUCCESS:
      return {
        loading: false,
        rfids: action.payload.data,
        count: action.payload.meta.total
      }

    case ALL_RFIDS_FAIL:
    case ADMIN_RFIDS_FAIL:
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

export const newRfidReducer = (state = { rfid: {} }, action) => {
  switch (action.type) {
    case NEW_RFID_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_RFID_SUCCESS:
      return {
        loading: false,
        success: true,
        rfid: action.payload.data,
      }

    case NEW_RFID_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case NEW_RFID_RESET:
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

export const rfidReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RFID_REQUEST:
    case UPDATE_RFID_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case DELETE_RFID_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_RFID_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_RFID_FAIL:
    case UPDATE_RFID_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_RFID_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case UPDATE_RFID_RESET:
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

export const rfidDetailsReducer = (state = { rfid: {} }, action) => {
  switch (action.type) {
    case RFID_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case RFID_DETAILS_SUCCESS:
      return {
        loading: false,
        rfid: action.payload,
      }

    case RFID_DETAILS_FAIL:
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
