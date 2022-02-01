import API from '../config/api'

import {
    ALL_SECTIONS_REQUEST,
    ALL_SECTIONS_SUCCESS,
    ALL_SECTIONS_FAIL,
    ADMIN_SECTIONS_REQUEST,
    ADMIN_SECTIONS_SUCCESS,
    ADMIN_SECTIONS_FAIL,
    NEW_SECTION_REQUEST,
    NEW_SECTION_SUCCESS,
    NEW_SECTION_FAIL,
    DELETE_SECTION_REQUEST,
    DELETE_SECTION_SUCCESS,
    DELETE_SECTION_FAIL,
    UPDATE_SECTION_REQUEST,
    UPDATE_SECTION_SUCCESS,
    UPDATE_SECTION_FAIL,
    SECTION_DETAILS_REQUEST,
    SECTION_DETAILS_SUCCESS,
    SECTION_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/sectionConstants'

export const getSections = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: ALL_SECTIONS_REQUEST })

        let link = `section?page=${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: ALL_SECTIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_SECTIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newSection = (sectionData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_SECTION_REQUEST })

        const { data } = await API.post(`section`, sectionData)

        dispatch({
            type: NEW_SECTION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SECTION_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete section (Admin)
export const deleteSection = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SECTION_REQUEST })

        const { data } = await API.delete(`section/${id}`)

        console.log(data)

        dispatch({
            type: DELETE_SECTION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_SECTION_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Section (ADMIN)
export const updateSection = (id, sectionData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_SECTION_REQUEST })

        const { data } = await API.put(`section/${id}`, sectionData)   

        dispatch({
            type: UPDATE_SECTION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SECTION_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

export const getSectionDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: SECTION_DETAILS_REQUEST })

        const { data } = await API.get(`section/${id}`)

        dispatch({
            type: SECTION_DETAILS_SUCCESS,
            payload: data.section
        })

    } catch (error) {
        dispatch({
            type: SECTION_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminSections = (page = 1, limit = 10) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_SECTIONS_REQUEST })

        const { data } = await API.get(`section?page=${++page}&limit=${limit}`)

        console.log(data)
        dispatch({
            type: ADMIN_SECTIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 401) {
          // localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
        }
        dispatch({
            type: ADMIN_SECTIONS_FAIL,
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