import API from '../config/api'

import {
    ALL_FACILITIES_REQUEST,
    ALL_FACILITIES_SUCCESS,
    ALL_FACILITIES_FAIL,
    ADMIN_FACILITIES_REQUEST,
    ADMIN_FACILITIES_SUCCESS,
    ADMIN_FACILITIES_FAIL,
    NEW_FACILITY_REQUEST,
    NEW_FACILITY_SUCCESS,
    NEW_FACILITY_FAIL,
    DELETE_FACILITY_REQUEST,
    DELETE_FACILITY_SUCCESS,
    DELETE_FACILITY_FAIL,
    UPDATE_FACILITY_REQUEST,
    UPDATE_FACILITY_SUCCESS,
    UPDATE_FACILITY_FAIL,
    FACILITY_DETAILS_REQUEST,
    FACILITY_DETAILS_SUCCESS,
    FACILITY_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/facilityConstants'

export const getFacilities = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_FACILITIES_REQUEST })

        let link = `facility?type=1&page=${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_FACILITIES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_FACILITIES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newFacility = (facilityData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_FACILITY_REQUEST })

        const { data } = await API.post(`facility`, facilityData)

        dispatch({
            type: NEW_FACILITY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_FACILITY_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete facility (Admin)
export const deleteFacility = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_FACILITY_REQUEST })

        const { data } = await API.delete(`facility/${id}`)

        dispatch({
            type: DELETE_FACILITY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_FACILITY_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Facility (ADMIN)
export const updateFacility = (id, facilityData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_FACILITY_REQUEST })

        const { data } = await API.put(`facility/${id}`, facilityData)   

        dispatch({
            type: UPDATE_FACILITY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_FACILITY_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getFacilityDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: FACILITY_DETAILS_REQUEST })

        const { data } = await API.get(`facility/${id}`)

        dispatch({
            type: FACILITY_DETAILS_SUCCESS,
            payload: data.facility
        })

    } catch (error) {
        dispatch({
            type: FACILITY_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminFacilities = (page = 1, limit = 10, query = '') => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_FACILITIES_REQUEST })

        const { data } = await API.get(`facility?page=${++page}&limit=${limit}&${query}`)

        dispatch({
            type: ADMIN_FACILITIES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_FACILITIES_FAIL,
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