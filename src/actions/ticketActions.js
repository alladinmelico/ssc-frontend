import API from '../config/api'

import {
    ALL_TICKETS_REQUEST,
    ALL_TICKETS_SUCCESS,
    ALL_TICKETS_FAIL,
    ADMIN_TICKETS_REQUEST,
    ADMIN_TICKETS_SUCCESS,
    ADMIN_TICKETS_FAIL,
    NEW_TICKET_REQUEST,
    NEW_TICKET_SUCCESS,
    NEW_TICKET_FAIL,
    DELETE_TICKET_REQUEST,
    DELETE_TICKET_SUCCESS,
    DELETE_TICKET_FAIL,
    UPDATE_TICKET_REQUEST,
    UPDATE_TICKET_SUCCESS,
    UPDATE_TICKET_FAIL,
    TICKET_DETAILS_REQUEST,
    TICKET_DETAILS_SUCCESS,
    TICKET_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/ticketConstants'

export const getTickets = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_TICKETS_REQUEST })

        let link = `ticket?page=${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_TICKETS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_TICKETS_FAIL,
            payload: error.response
        })
    }
}

export const newTicket = (ticketData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_TICKET_REQUEST })

        const { data } = await API.post(`ticket`, ticketData)

        dispatch({
            type: NEW_TICKET_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_TICKET_FAIL,
            payload: error.response
        })
    }
}

// Delete ticket (Admin)
export const deleteTicket = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_TICKET_REQUEST })

        const { data } = await API.delete(`ticket/${id}`)

        dispatch({
            type: DELETE_TICKET_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_TICKET_FAIL,
            payload: error.response
        })
    }
}

// Update Ticket (ADMIN)
export const updateTicket = (id, ticketData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_TICKET_REQUEST })

        const { data } = await API.put(`ticket/${id}`, ticketData)   

        dispatch({
            type: UPDATE_TICKET_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_TICKET_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getTicketDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: TICKET_DETAILS_REQUEST })

        const { data } = await API.get(`ticket/${id}`)

        dispatch({
            type: TICKET_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TICKET_DETAILS_FAIL,
            payload: error
        })
    }
}

export const getAdminTickets = (page = 1, limit = 10) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_TICKETS_REQUEST })

        const { data } = await API.get(`ticket?page=${++page}&limit=${limit}`)

        dispatch({
            type: ADMIN_TICKETS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_TICKETS_FAIL,
            payload: error
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}