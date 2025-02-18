import { postsAPI } from '../../api/api'
import { setError } from './errorReducer'


// ======== Initialize ========
const SET_MAIN_POSTS = 'SET_MAIN_POSTS'
const SET_PROFILE_POSTS = 'SET_PROFILE_POSTS'
const ADD_PROFILE_POSTS = 'ADD_PROFILE_POSTS'
const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
const SET_COMMENTS_MAIN_POST = 'SET_COMMENTS_MAIN_POST'
const SET_COMMENTS_PROFILE_POST = 'SET_COMMENTS_PROFILE_POST'

let defaultState = {
    mainPosts: [],
    profilePosts: [],
    filterType: 'all'
}

// ======== Reducer ========
const postReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_MAIN_POSTS:
            return {
                ...state,
                mainPosts: action.payload
            }
        case SET_PROFILE_POSTS:
            return {
                ...state,
                profilePosts: action.payload
            }
        case ADD_PROFILE_POSTS:
            return {
                ...state,
                profilePosts: [action.payload, ...state.profilePosts]
            }
        case SET_FILTER_TYPE:
            return {
                ...state,
                filterType: action.payload
            }
        case SET_COMMENTS_MAIN_POST:
            const findedCommentMainPost = state.mainPosts.find(art => art.id === action.payload.postId)
            findedCommentMainPost.comments_data = action.payload.comments
            const filtredMainPosts = []
            for (let i = 0; i <= state.mainPosts.length - 1; i++) {
                if (state.mainPosts[i].id === action.payload.postId) {
                    filtredMainPosts.push(findedCommentMainPost)
                } else {
                    filtredMainPosts.push(state.mainPosts[i])
                }
            }
            return {
                ...state,
                mainPosts: [...filtredMainPosts]
            }
        case SET_COMMENTS_PROFILE_POST:
            const findedCommentProfilePost = state.profilePosts.find(art => art.id === action.payload.postId)
            findedCommentProfilePost.comments_data = action.payload.comments
            const filtredProfilePosts = []
            for (let i = 0; i <= state.profilePosts.length - 1; i++) {
                if (state.profilePosts[i].id === action.payload.postId) {
                    filtredProfilePosts.push(findedCommentProfilePost)
                } else {
                    filtredProfilePosts.push(state.profilePosts[i])
                }
            }
            return {
                ...state,
                profilePosts: [...filtredProfilePosts]
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const setMainPostsAC = (data) => ({
    type: SET_MAIN_POSTS, 
    payload: data
})

export const setProfilePostsAC = (data) => ({
    type: SET_PROFILE_POSTS,
    payload: data
})

export const addProfilePostsAC = (data) => ({
    type: ADD_PROFILE_POSTS,
    payload: data
})

export const setPostsFilterTypeAC = (type) => ({
    type: SET_FILTER_TYPE,
    payload: type
})

export const setCommentsMainPostAC = (comments, postId) => ({
    type: SET_COMMENTS_MAIN_POST,
    payload: {comments, postId}
})

export const setCommentsProfilePostAC = (comments, postId) => ({
    type: SET_COMMENTS_PROFILE_POST,
    payload: {comments, postId}
})

// ======== Thunks ========
export const getMainPosts = (authId = null) => async (dispatch) => {
    const data = await postsAPI.getMainPosts(authId)
    dispatch(setMainPostsAC(data))
}

export const getProfilePosts = (profileId) => async (dispatch) => {
    const data = await postsAPI.getProfilePosts(profileId)
    if (data.statusCode === 1) {
        dispatch(setProfilePostsAC(data.data))
    } else {
        dispatch(setProfilePostsAC([]))
    }
}

export const sendPost = (text) => async (dispatch, getState) => {
    const post = {
        'text': text,
        'created_at': new Date().getTime(),
        'likes_count': 0,
        'likes_id': [],
        'comments_count': 0,
        'comments_id': [],
        'author': getState().auth.username,
        'author_id': getState().auth.id
    }
    const sendData = await postsAPI.sendPost(post, post.author_id)
    if (sendData.statusCode === 1) {
        dispatch(addProfilePostsAC(post))
    } else {
        dispatch(setError('Невозможно создать пост'))
    }
}

export const likePost = (profileId, postId, authId) => async (dispatch) => {
    const data = await postsAPI.likePost(profileId, postId, authId)
    if (data.statusCode !== 1) {
        dispatch(setError('Невозможно поставить лайк'))
    }
}

export const removePost = (postId) => async (dispatch, getState) => {
    const data = await postsAPI.removePost(postId, getState().auth.id)
    if (data.statusCode === 1) {
        dispatch(setProfilePostsAC(getState().post.profilePosts.filter(post => post.id !== postId)))
    } else {
        dispatch(setError('Невозможно удалить пост'))
    }
}


export default postReducer