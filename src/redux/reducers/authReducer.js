import { authAPI } from "../../api/api"


// ======== Initialize ========
const SET_USER_DATA = 'SET_USER_DATA'

let defaultState = {
    isAuth: false,
    id: null,
    customId: null,
    username: null,
    email: null,
    createdAt: null,
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
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const setAuthUserDataAC = (isAuth, id, customId, username, email, createdAt, followersCount) => ({
    type: SET_USER_DATA,
    payload: {isAuth, id, customId, username, email, createdAt, followersCount}
})

// ======== Thunks ========
export const getAuthUserData = () => async (dispatch) => {
    const data = await authAPI.me()
    if (data) {
        dispatch(setAuthUserDataAC(true, data.id, data.custom_id, data.login, data.email, data.created_at, data.followers_count))
    } else {
        dispatch(setAuthUserDataAC(false, null, null, null, null, null, 0))
    }
}


export default authReducer