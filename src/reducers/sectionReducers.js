import {
  ALL_SECTIONS_REQUEST,
  ALL_SECTIONS_SUCCESS,
  ALL_SECTIONS_FAIL,
  ADMIN_SECTIONS_REQUEST,
  ADMIN_SECTIONS_SUCCESS,
  ADMIN_SECTIONS_FAIL,
  NEW_SECTION_REQUEST,
  NEW_SECTION_SUCCESS,
  NEW_SECTION_RESET,
  NEW_SECTION_FAIL,
  DELETE_SECTION_REQUEST,
  DELETE_SECTION_SUCCESS,
  DELETE_SECTION_RESET,
  DELETE_SECTION_FAIL,
  UPDATE_SECTION_REQUEST,
  UPDATE_SECTION_SUCCESS,
  UPDATE_SECTION_RESET,
  UPDATE_SECTION_FAIL,
  SECTION_DETAILS_REQUEST,
  SECTION_DETAILS_SUCCESS,
  SECTION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/sectionConstants"

export const sectionsReducer = (state = { sections: [] }, action) => {
  switch (action.type) {
    case ALL_SECTIONS_REQUEST:
    case ADMIN_SECTIONS_REQUEST:
      return {
        loading: true,
        sections: [],
      }

    case ALL_SECTIONS_SUCCESS:
      return {
        loading: false,
        sections: action.payload.sections,
        sectionsCount: action.payload.sectionsCount,
        resPerPage: action.payload.resPerPage,
        filteredSectionsCount: action.payload.filteredSectionsCount,
      }

    case ADMIN_SECTIONS_SUCCESS:
      return {
        loading: false,
        sections: action.payload.data,
        count: action.payload.meta.total
      }

    case ALL_SECTIONS_FAIL:
    case ADMIN_SECTIONS_FAIL:
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

export const newSectionReducer = (state = { section: {} }, action) => {
  switch (action.type) {
    case NEW_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_SECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        section: action.payload.data,
      }

    case NEW_SECTION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case NEW_SECTION_RESET:
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

export const sectionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SECTION_REQUEST:
    case UPDATE_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case DELETE_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_SECTION_FAIL:
    case UPDATE_SECTION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_SECTION_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case UPDATE_SECTION_RESET:
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

export const sectionDetailsReducer = (state = { section: {} }, action) => {
  switch (action.type) {
    case SECTION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case SECTION_DETAILS_SUCCESS:
      return {
        loading: false,
        section: action.payload,
      }

    case SECTION_DETAILS_FAIL:
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
