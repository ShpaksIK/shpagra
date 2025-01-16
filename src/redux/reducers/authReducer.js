import { authAPI } from "../../api/api"


// ======== Initialize ========
const SET_USER_DATA = 'SET_USER_DATA'

let defaultState = {
    isAuth: false,
    id: null,
    username: null,
    email: null,
    likes: null
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
export const setAuthUserDataAC = (isAuth, id, username, email, likes) => ({
    type: SET_USER_DATA,
    payload: {isAuth, id, username, email, likes}
})

// ======== Thunks ========
export const getAuthUserData = () => async (dispatch) => {
    const data = await authAPI.me()
    if (data) {
        const {id, login, email, likes} = data
        dispatch(setAuthUserDataAC(true, id, login, email, likes))
    }
}


export default authReducer