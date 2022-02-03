import API from '../config/api'

import {
    ALL_CLASSROOMS_REQUEST,
    ALL_CLASSROOMS_SUCCESS,
    ALL_CLASSROOMS_FAIL,
    ADMIN_CLASSROOMS_REQUEST,
    ADMIN_CLASSROOMS_SUCCESS,
    ADMIN_CLASSROOMS_FAIL,
    NEW_CLASSROOM_REQUEST,
    NEW_CLASSROOM_SUCCESS,
    NEW_CLASSROOM_FAIL,
    DELETE_CLASSROOM_REQUEST,
    DELETE_CLASSROOM_SUCCESS,
    DELETE_CLASSROOM_FAIL,
    UPDATE_CLASSROOM_REQUEST,
    UPDATE_CLASSROOM_SUCCESS,
    UPDATE_CLASSROOM_FAIL,
    CLASSROOM_DETAILS_REQUEST,
    CLASSROOM_DETAILS_SUCCESS,
    CLASSROOM_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/classroomConstants'

export const getClassrooms = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_CLASSROOMS_REQUEST })

        let link = `classroom?type=1&${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_CLASSROOMS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_CLASSROOMS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newClassroom = (classroomData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_CLASSROOM_REQUEST })

        const { data } = await API.post(`classroom`, classroomData)

        dispatch({
            type: NEW_CLASSROOM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_CLASSROOM_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete classroom (Admin)
export const deleteClassroom = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_CLASSROOM_REQUEST })

        const { data } = await API.delete(`classroom/${id}`)

        console.log(data)

        dispatch({
            type: DELETE_CLASSROOM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_CLASSROOM_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Classroom (ADMIN)
export const updateClassroom = (id, classroomData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_CLASSROOM_REQUEST })

        const { data } = await API.put(`classroom/${id}`, classroomData)   

        dispatch({
            type: UPDATE_CLASSROOM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_CLASSROOM_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getClassroomDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: CLASSROOM_DETAILS_REQUEST })

        const { data } = await API.get(`classroom/${id}`)

        dispatch({
            type: CLASSROOM_DETAILS_SUCCESS,
            payload: data.classroom
        })

    } catch (error) {
        dispatch({
            type: CLASSROOM_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminClassrooms = (page = 1, limit = 10) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_CLASSROOMS_REQUEST })

        const { data } = await API.get(`classroom?type=1&page=${++page}&limit=${limit}`)

        console.log(data)
        dispatch({
            type: ADMIN_CLASSROOMS_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 401) {
          // localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
        }
        dispatch({
            type: ADMIN_CLASSROOMS_FAIL,
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