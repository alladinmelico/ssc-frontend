import {
  ALL_FACILITIES_REQUEST,
  ALL_FACILITIES_SUCCESS,
  ALL_FACILITIES_FAIL,
  ADMIN_FACILITIES_REQUEST,
  ADMIN_FACILITIES_SUCCESS,
  ADMIN_FACILITIES_FAIL,
  NEW_FACILITY_REQUEST,
  NEW_FACILITY_SUCCESS,
  NEW_FACILITY_RESET,
  NEW_FACILITY_FAIL,
  DELETE_FACILITY_REQUEST,
  DELETE_FACILITY_SUCCESS,
  DELETE_FACILITY_RESET,
  DELETE_FACILITY_FAIL,
  UPDATE_FACILITY_REQUEST,
  UPDATE_FACILITY_SUCCESS,
  UPDATE_FACILITY_RESET,
  UPDATE_FACILITY_FAIL,
  FACILITY_DETAILS_REQUEST,
  FACILITY_DETAILS_SUCCESS,
  FACILITY_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/facilityConstants"

export const facilitiesReducer = (state = { facilities: [] }, action) => {
  switch (action.type) {
    case ALL_FACILITIES_REQUEST:
    case ADMIN_FACILITIES_REQUEST:
      return {
        loading: true,
        facilities: state.facilities,
      }

    case ALL_FACILITIES_SUCCESS:
      return {
        loading: false,
        facilities: action.payload.facilities,
        facilitiesCount: action.payload.facilitiesCount,
        resPerPage: action.payload.resPerPage,
        filteredFacilitiesCount: action.payload.filteredFacilitiesCount,
      }

    case ADMIN_FACILITIES_SUCCESS:
      return {
        loading: false,
        facilities: action.payload.data,
        count: action.payload.meta?.total,
        currentPage: action.payload.meta?.current_page,
        lastPage: action.payload.meta?.last_page,
      }

    case ALL_FACILITIES_FAIL:
    case ADMIN_FACILITIES_FAIL:
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

export const newFacilityReducer = (state = { facility: {} }, action) => {
  switch (action.type) {
    case NEW_FACILITY_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_FACILITY_SUCCESS:
      return {
        loading: false,
        success: true,
        facility: action.payload.data,
      }

    case NEW_FACILITY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case NEW_FACILITY_RESET:
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

export const facilityReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FACILITY_REQUEST:
    case UPDATE_FACILITY_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case DELETE_FACILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_FACILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_FACILITY_FAIL:
    case UPDATE_FACILITY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_FACILITY_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case UPDATE_FACILITY_RESET:
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

export const facilityDetailsReducer = (state = { facility: {} }, action) => {
  switch (action.type) {
    case FACILITY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case FACILITY_DETAILS_SUCCESS:
      return {
        loading: false,
        facility: action.payload.data,
      }

    case FACILITY_DETAILS_FAIL:
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
