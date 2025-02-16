import { profileAPI } from "../../api/api"
import { setArticleAvatar } from "./articleReducer"
import { setError } from "./errorReducer"


// ======== Initialize ========
const SET_PROFILE_DATA = 'SET_PROFILE_DATA'
const ADD_FOLLOWERS_COUNT = 'ADD_FOLLOWERS_COUNT'
const SUBTRACT_FOLLOWERS_COUNT = 'SUBTRACT_FOLLOWERS_COUNT'

let defaultState = {
    id: null,
    customId: null,
    username: null,
    avatar: null,
    email: null,
    createdAt: null,
    followersCount: 0,
    isFollowed: false
}

// ======== Reducer ========
const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {
                ...state,
                ...action.payload
            }
        case ADD_FOLLOWERS_COUNT:
            return {
                ...state,
                followersCount: state.followersCount + 1,
                isFollowed: true
            }
        case SUBTRACT_FOLLOWERS_COUNT:
            return {
                ...state,
                followersCount: state.followersCount - 1,
                isFollowed: false
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const setProfileDataAC = (id, customId, username, avatar, email, createdAt, followersCount) => ({
    type: SET_PROFILE_DATA,
    payload: {id, customId, username, avatar, email, createdAt, followersCount}
})

export const addFollowersCountAC = () => ({
    type: ADD_FOLLOWERS_COUNT
})

export const subtractFollowersCountAC = () => ({
    type: SUBTRACT_FOLLOWERS_COUNT
})

// ======== Thunks ========
export const getProfileData = (id) => async (dispatch) => {
    const data = await profileAPI.getProfile(id)
    if (data) {
        dispatch(setProfileDataAC(data.id, data.custom_id, data.login, data.avatar, data.email, data.created_at, data.followers_count))
    }
}

export const getProfileAvatar = (id, toObject, objectId) => async (dispatch) => {
    const data = await profileAPI.getProfileAvatar(id)
    if (data.statusCode === 1) {
        if (toObject === 'article') {
            dispatch(setArticleAvatar(objectId, data.avatar))
        } else if (toObject === 'post') {
            dispatch()
        } else if (toObject === 'comment') {
            dispatch()
        }
    }
}

export const subscribe = (id) => async (dispatch, getState) => {
    const authId = getState().auth.id
    if (authId) {
        if (authId != id) {
            const data = await profileAPI.subscribe(id, authId)
            if (data.type === 'sub') {
                dispatch(addFollowersCountAC())
            } else {
                dispatch(subtractFollowersCountAC())
            }
        } else {
            dispatch(setError('Вы не можете подписываться на самого себя'))
        }
    } else {
        dispatch(setError('Войдите в аккаунт, прежде чем подписываться'))
    }
}


export default profileReducer