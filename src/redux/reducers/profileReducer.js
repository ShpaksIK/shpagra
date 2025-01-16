import { profileAPI } from "../../api/api"


// ======== Initialize ========
const SET_PROFILE_DATA = 'SET_PROFILE_DATA'

let defaultState = {
    id: null,
    username: null,
    likes: null
}

// ======== Reducer ========
const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const setProfileDataAC = (id, username, likes) => ({
    type: SET_PROFILE_DATA,
    payload: {id, username, likes}
})

// ======== Thunks ========
export const getProfileData = (id) => async (dispatch) => {
    const data = await profileAPI.getProfile(id)
    if (data) {
        const {id, login, likes} = data
        dispatch(setProfileDataAC(id, login, likes))
    }
}


export default profileReducer