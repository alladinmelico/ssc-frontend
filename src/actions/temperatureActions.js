import API from '../config/api'

import {
    ALL_TEMPERATURES_REQUEST,
    ALL_TEMPERATURES_SUCCESS,
    ALL_TEMPERATURES_FAIL,
    ADMIN_TEMPERATURES_REQUEST,
    ADMIN_TEMPERATURES_SUCCESS,
    ADMIN_TEMPERATURES_FAIL,
    NEW_TEMPERATURE_REQUEST,
    NEW_TEMPERATURE_SUCCESS,
    NEW_TEMPERATURE_FAIL,
    DELETE_TEMPERATURE_REQUEST,
    DELETE_TEMPERATURE_SUCCESS,
    DELETE_TEMPERATURE_FAIL,
    UPDATE_TEMPERATURE_REQUEST,
    UPDATE_TEMPERATURE_SUCCESS,
    UPDATE_TEMPERATURE_FAIL,
    TEMPERATURE_DETAILS_REQUEST,
    TEMPERATURE_DETAILS_SUCCESS,
    TEMPERATURE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/temperatureConstants'

export const getTemperatures = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_TEMPERATURES_REQUEST })

        let link = `temperature?type=1&${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_TEMPERATURES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_TEMPERATURES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newTemperature = (temperatureData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_TEMPERATURE_REQUEST })

        const { data } = await API.post(`temperature`, temperatureData)

        dispatch({
            type: NEW_TEMPERATURE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_TEMPERATURE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete temperature (Admin)
export const deleteTemperature = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_TEMPERATURE_REQUEST })

        const { data } = await API.delete(`temperature/${id}`)

        dispatch({
            type: DELETE_TEMPERATURE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_TEMPERATURE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Temperature (ADMIN)
export const updateTemperature = (id, temperatureData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_TEMPERATURE_REQUEST })

        const { data } = await API.put(`temperature/${id}`, temperatureData)   

        dispatch({
            type: UPDATE_TEMPERATURE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_TEMPERATURE_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getTemperatureDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: TEMPERATURE_DETAILS_REQUEST })

        const { data } = await API.get(`temperature/${id}`)

        dispatch({
            type: TEMPERATURE_DETAILS_SUCCESS,
            payload: data.temperature
        })

    } catch (error) {
        dispatch({
            type: TEMPERATURE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminTemperatures = (page = 1, limit = 10) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_TEMPERATURES_REQUEST })

        const { data } = await API.get(`temperature?type=1&page=${++page}&limit=${limit}`)

        dispatch({
            type: ADMIN_TEMPERATURES_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 401) {
          // localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
        }
        dispatch({
            type: ADMIN_TEMPERATURES_FAIL,
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