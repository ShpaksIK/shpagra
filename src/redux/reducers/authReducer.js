import { authAPI } from "../../api/api"
import { setError } from "./errorReducer"


// ======== Initialize ========
const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_AVATAR = 'SET_USER_AVATAR'

let defaultState = {
    isAuth: false,
    id: null,
    customId: null,
    username: null,
    email: null,
    createdAt: null,
    avatar: null,
    followersCount: 0
}

// ======== Reducer ========
const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_USER_AVATAR:
            return {
                ...state,
                avatar: action.payload
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const setAuthUserDataAC = (isAuth, id, customId, username, avatar, email, createdAt, followersCount) => ({
    type: SET_USER_DATA,
    payload: {isAuth, id, customId, username, avatar, email, createdAt, followersCount}
})

const setUserAvatarAC = (file) => ({
    type: SET_USER_AVATAR,
    payload: file
})

// ======== Thunks ========
export const getAuthUserData = () => async (dispatch) => {
    const data = await authAPI.me()
    if (data) {
        dispatch(setAuthUserDataAC(true, data.id, data.custom_id, data.login, data.avatar, data.email, data.created_at, data.followers_count))
    } else {
        dispatch(setAuthUserDataAC(false, null, null, null, null, null, 0))
    }
}

export const setUserAvatar = (file) => async (dispatch, getState) => {
    const data = await authAPI.setAvatar(file, getState().auth.id)
    if (data.statusCode === 1) {
        dispatch(setUserAvatarAC(file))
    } else {
        dispatch(setUserAvatarAC(''))
        dispatch(setError('Не удалось загрузить изображение'))
    }
}


export default authReducer