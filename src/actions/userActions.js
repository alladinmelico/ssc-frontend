import axios from 'axios'
import API from '../config/api'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
    GOOGLE_SIGN_IN_REQUEST,
    GOOGLE_SIGN_IN_SUCCESS,
    GOOGLE_SIGN_IN_FAIL,
    NEW_USER_REQUEST,
    NEW_USER_SUCCESS,
    NEW_USER_FAIL,
    ADMIN_USERS_REQUEST,
    ADMIN_USERS_SUCCESS,
    ADMIN_USERS_FAIL,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
} from '../constants/userConstants'

// Login
export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/login', { email, password }, config)

        console.log('user', data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('isAuthenticated', true)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('isAuthenticated', true)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })
        
        if (localStorage.getItem('user') !== null) {
          dispatch({
              type: LOAD_USER_SUCCESS,
              payload: JSON.parse(localStorage.getItem('user'))
          })
          return
        }

        const { data } = await axios.get('/api/v1/me')

        localStorage.setItem('user', JSON.stringify(data.user))

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load user
export const loadLoggedUser = () => (dispatch) => {
    dispatch({ type: LOAD_USER_REQUEST })
    
    if (localStorage.getItem('user') !== null) {
      dispatch({
          type: LOAD_USER_SUCCESS,
          payload: JSON.parse(localStorage.getItem('user'))
      })
      return
    }
    dispatch({
        type: LOAD_USER_FAIL,
        payload: 'Not logged in'
    })
}

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/v1/me/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/password/forgot', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout')

        localStorage.removeItem('user')
        localStorage.removeItem('token')

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const { data } = await API.put(`user/${id}`, userData)   

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: { 
              message: error.response.data.message ?? error.response.data.errMessage,
              status: error.response.status
            }
        })
    }
}

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await API.get(`user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await API.delete(`user/${id}`)

        console.log(data)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Google Sign in
export const googleSignIn = (payload) => async (dispatch) => {
    try {

        dispatch({ type: GOOGLE_SIGN_IN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/auth/google', payload, config)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('isAuthenticated', true)

        dispatch({
            type: GOOGLE_SIGN_IN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: GOOGLE_SIGN_IN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Create User (Admin)
export const newUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_USER_REQUEST })

        const { data } = await API.post(`user`, userData)

        dispatch({
            type: NEW_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUsers = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: GET_USERS_REQUEST })

        let link = `user?page=${currentPage}`

        const { data } = await API.get(link)

        dispatch({
            type: GET_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminUsers = (page = 1, limit = 10) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_USERS_REQUEST })

        const { data } = await API.get(`user?page=${++page}&limit=${limit}`)

        console.log(data)
        dispatch({
            type: ADMIN_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        if (error.response.status === 401) {
          // localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
        }
        dispatch({
            type: ADMIN_USERS_FAIL,
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