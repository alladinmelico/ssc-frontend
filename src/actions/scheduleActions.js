import API from '../config/api'

import {
    ALL_SCHEDULES_REQUEST,
    ALL_SCHEDULES_SUCCESS,
    ALL_SCHEDULES_FAIL,
    ADMIN_SCHEDULES_REQUEST,
    ADMIN_SCHEDULES_SUCCESS,
    ADMIN_SCHEDULES_FAIL,
    NEW_SCHEDULE_REQUEST,
    NEW_SCHEDULE_SUCCESS,
    NEW_SCHEDULE_FAIL,
    DELETE_SCHEDULE_REQUEST,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAIL,
    UPDATE_SCHEDULE_REQUEST,
    UPDATE_SCHEDULE_SUCCESS,
    UPDATE_SCHEDULE_FAIL,
    SCHEDULE_DETAILS_REQUEST,
    SCHEDULE_DETAILS_SUCCESS,
    SCHEDULE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/scheduleConstants'

export const getSchedules = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_SCHEDULES_REQUEST })

        let link = `schedule?page=${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_SCHEDULES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_SCHEDULES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newSchedule = (scheduleData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_SCHEDULE_REQUEST })

        const { data } = await API.post(`schedule`, scheduleData)

        dispatch({
            type: NEW_SCHEDULE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SCHEDULE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete schedule (Admin)
export const deleteSchedule = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SCHEDULE_REQUEST })

        const { data } = await API.delete(`schedule/${id}`)

        console.log(data)

        dispatch({
            type: DELETE_SCHEDULE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_SCHEDULE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Schedule (ADMIN)
export const updateSchedule = (id, scheduleData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_SCHEDULE_REQUEST })

        const { data } = await API.put(`schedule/${id}`, scheduleData)   

        dispatch({
            type: UPDATE_SCHEDULE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SCHEDULE_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getScheduleDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: SCHEDULE_DETAILS_REQUEST })

        const { data } = await API.get(`schedule/${id}`)

        dispatch({
            type: SCHEDULE_DETAILS_SUCCESS,
            payload: data.schedule
        })

    } catch (error) {
        dispatch({
            type: SCHEDULE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminSchedules = (page = 1, limit = 10) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_SCHEDULES_REQUEST })

        const { data } = await API.get(`schedule?page=${++page}&limit=${limit}`)

        console.log(data)
        dispatch({
            type: ADMIN_SCHEDULES_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 401) {
          // localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
        }
        dispatch({
            type: ADMIN_SCHEDULES_FAIL,
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