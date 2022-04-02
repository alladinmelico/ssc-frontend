import {
  ALL_TICKETS_REQUEST,
  ALL_TICKETS_SUCCESS,
  ALL_TICKETS_FAIL,
  ADMIN_TICKETS_REQUEST,
  ADMIN_TICKETS_SUCCESS,
  ADMIN_TICKETS_FAIL,
  NEW_TICKET_REQUEST,
  NEW_TICKET_SUCCESS,
  NEW_TICKET_RESET,
  NEW_TICKET_FAIL,
  DELETE_TICKET_REQUEST,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_RESET,
  DELETE_TICKET_FAIL,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_RESET,
  UPDATE_TICKET_FAIL,
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
  TICKET_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/ticketConstants"

export const ticketsReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case ALL_TICKETS_REQUEST:
    case ADMIN_TICKETS_REQUEST:
      return {
        loading: true,
        tickets: state.tickets,
      }

    case ALL_TICKETS_SUCCESS:
      return {
        loading: false,
        tickets: action.payload.tickets,
        ticketsCount: action.payload.ticketsCount,
        resPerPage: action.payload.resPerPage,
        filteredTicketsCount: action.payload.filteredTicketsCount,
      }

    case ADMIN_TICKETS_SUCCESS:
      return {
        loading: false,
        tickets: action.payload.data,
        count: action.payload.meta.total,
        currentPage: action.payload.meta.current_page,
        lastPage: action.payload.meta.last_page,
      }

    case ALL_TICKETS_FAIL:
    case ADMIN_TICKETS_FAIL:
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

export const newTicketReducer = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case NEW_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_TICKET_SUCCESS:
      return {
        loading: false,
        success: true,
        ticket: action.payload.data,
      }

    case NEW_TICKET_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case NEW_TICKET_RESET:
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

export const ticketReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TICKET_REQUEST:
    case UPDATE_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }

    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    case DELETE_TICKET_FAIL:
    case UPDATE_TICKET_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_TICKET_RESET:
      return {
        ...state,
        isDeleted: false,
      }

    case UPDATE_TICKET_RESET:
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

export const ticketDetailsReducer = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case TICKET_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case TICKET_DETAILS_SUCCESS:
      return {
        loading: false,
        ticket: action.payload.data,
      }

    case TICKET_DETAILS_FAIL:
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
