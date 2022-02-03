import API from '../config/api'

import {
    ALL_RFIDS_REQUEST,
    ALL_RFIDS_SUCCESS,
    ALL_RFIDS_FAIL,
    ADMIN_RFIDS_REQUEST,
    ADMIN_RFIDS_SUCCESS,
    ADMIN_RFIDS_FAIL,
    NEW_RFID_REQUEST,
    NEW_RFID_SUCCESS,
    NEW_RFID_FAIL,
    DELETE_RFID_REQUEST,
    DELETE_RFID_SUCCESS,
    DELETE_RFID_FAIL,
    UPDATE_RFID_REQUEST,
    UPDATE_RFID_SUCCESS,
    UPDATE_RFID_FAIL,
    RFID_DETAILS_REQUEST,
    RFID_DETAILS_SUCCESS,
    RFID_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/rfidConstants'

export const getRfids = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_RFIDS_REQUEST })

        let link = `rfid?page=${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_RFIDS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_RFIDS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newRfid = (rfidData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_RFID_REQUEST })

        const { data } = await API.post(`rfid`, rfidData)

        dispatch({
            type: NEW_RFID_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_RFID_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete rfid (Admin)
export const deleteRfid = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_RFID_REQUEST })

        const { data } = await API.delete(`rfid/${id}`)

        console.log(data)

        dispatch({
            type: DELETE_RFID_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_RFID_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Rfid (ADMIN)
export const updateRfid = (id, rfidData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_RFID_REQUEST })

        const { data } = await API.put(`rfid/${id}`, rfidData)   

        dispatch({
            type: UPDATE_RFID_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_RFID_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getRfidDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: RFID_DETAILS_REQUEST })

        const { data } = await API.get(`rfid/${id}`)

        dispatch({
            type: RFID_DETAILS_SUCCESS,
            payload: data.rfid
        })

    } catch (error) {
        dispatch({
            type: RFID_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminRfids = (page = 1, limit = 10) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_RFIDS_REQUEST })

        const { data } = await API.get(`rfid?page=${++page}&limit=${limit}`)

        console.log(data)
        dispatch({
            type: ADMIN_RFIDS_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 401) {
          // localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
        }
        dispatch({
            type: ADMIN_RFIDS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}