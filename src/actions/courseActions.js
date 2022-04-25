import API from '../config/api'

import {
    ALL_COURSES_REQUEST,
    ALL_COURSES_SUCCESS,
    ALL_COURSES_FAIL,
    ADMIN_COURSES_REQUEST,
    ADMIN_COURSES_SUCCESS,
    ADMIN_COURSES_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAIL,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/courseConstants'

export const getCourses = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_COURSES_REQUEST })

        let link = `course?type=1&${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_COURSES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_COURSES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newCourse = (courseData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COURSE_REQUEST })

        const { data } = await API.post(`course`, courseData)

        dispatch({
            type: NEW_COURSE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_COURSE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete course (Admin)
export const deleteCourse = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_COURSE_REQUEST })

        const { data } = await API.delete(`course/${id}`)

        dispatch({
            type: DELETE_COURSE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_COURSE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Course (ADMIN)
export const updateCourse = (id, courseData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_COURSE_REQUEST })

        const { data } = await API.put(`course/${id}`, courseData)   

        dispatch({
            type: UPDATE_COURSE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_COURSE_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getCourseDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: COURSE_DETAILS_REQUEST })

        const { data } = await API.get(`course/${id}`)

        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data.course
        })

    } catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminCourses = (page = 1, limit = 10, params) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_COURSES_REQUEST })

        const { data } = await API.get(`course?type=1&page=${++page}&limit=${limit}&${params}`)

        dispatch({
            type: ADMIN_COURSES_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 401) {
          // localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
        }
        dispatch({
            type: ADMIN_COURSES_FAIL,
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