import API from '../config/api'

import {
    ALL_SUBJECTS_REQUEST,
    ALL_SUBJECTS_SUCCESS,
    ALL_SUBJECTS_FAIL,
    ADMIN_SUBJECTS_REQUEST,
    ADMIN_SUBJECTS_SUCCESS,
    ADMIN_SUBJECTS_FAIL,
    NEW_SUBJECT_REQUEST,
    NEW_SUBJECT_SUCCESS,
    NEW_SUBJECT_FAIL,
    DELETE_SUBJECT_REQUEST,
    DELETE_SUBJECT_SUCCESS,
    DELETE_SUBJECT_FAIL,
    UPDATE_SUBJECT_REQUEST,
    UPDATE_SUBJECT_SUCCESS,
    UPDATE_SUBJECT_FAIL,
    SUBJECT_DETAILS_REQUEST,
    SUBJECT_DETAILS_SUCCESS,
    SUBJECT_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/subjectConstants'

export const getSubjects = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_SUBJECTS_REQUEST })

        let link = `subject?page=${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_SUBJECTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_SUBJECTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newSubject = (subjectData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_SUBJECT_REQUEST })

        const { data } = await API.post(`subject`, subjectData)

        dispatch({
            type: NEW_SUBJECT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SUBJECT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete subject (Admin)
export const deleteSubject = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUBJECT_REQUEST })

        const { data } = await API.delete(`subject/${id}`)

        console.log(data)

        dispatch({
            type: DELETE_SUBJECT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUBJECT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Subject (ADMIN)
export const updateSubject = (id, subjectData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_SUBJECT_REQUEST })

        const { data } = await API.put(`subject/${id}`, subjectData)   

        dispatch({
            type: UPDATE_SUBJECT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SUBJECT_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getSubjectDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: SUBJECT_DETAILS_REQUEST })

        const { data } = await API.get(`subject/${id}`)

        dispatch({
            type: SUBJECT_DETAILS_SUCCESS,
            payload: data.subject
        })

    } catch (error) {
        dispatch({
            type: SUBJECT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminSubjects = (page = 1, limit = 10) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_SUBJECTS_REQUEST })

        const { data } = await API.get(`subject?page=${++page}&limit=${limit}`)

        console.log(data)
        dispatch({
            type: ADMIN_SUBJECTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 401) {
          // localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
        }
        dispatch({
            type: ADMIN_SUBJECTS_FAIL,
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