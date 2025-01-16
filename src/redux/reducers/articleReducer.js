import { articlesAPI } from '../../api/api'
import { setError } from './errorReducer'


// ======== Initialize ========
const SET_MAIN_ARTICLES = 'SET_MAIN_ARTICLES'
const SET_PROFILE_ARTICLES = 'SET_PROFILE_ARTICLES'
const CHANGE_EDITING_ARTICLES_DATA = 'CHANGE_EDITING_ARTICLES_DATA'
const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
const SET_COMMENTS_MAIN_ARTICLE = 'SET_COMMENTS_MAIN_ARTICLE'
const SET_COMMENTS_PROFILE_ARTICLE = 'SET_COMMENTS_PROFILE_ARTICLE'

let defaultState = {
    mainArticles: [],
    profileArticles: [],
    editingArticle: null,
    filterType: 'popular'
}


// ======== Reducer ========
const articleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_MAIN_ARTICLES:
            return {
                ...state,
                mainArticles: action.payload
            }
        case SET_PROFILE_ARTICLES:
            return {
                ...state,
                profileArticles: action.payload
            }
        case CHANGE_EDITING_ARTICLES_DATA:
            return {
                ...state,
                editingArticle: action.payload
            }
        case SET_FILTER_TYPE:
            return {
                ...state,
                filterType: action.payload
            }
        case SET_COMMENTS_MAIN_ARTICLE:
            const findedCommentMainArticle = state.mainArticles.find(art => art.id === action.payload.articleId)
            findedCommentMainArticle.comments_data = action.payload.comments
            const filtredMainArticles = []
            for (let i = 0; i <= state.mainArticles.length - 1; i++) {
                if (state.mainArticles[i].id === action.payload.articleId) {
                    filtredMainArticles.push(findedCommentMainArticle)
                } else {
                    filtredMainArticles.push(state.mainArticles[i])
                }
            }
            return {
                ...state,
                mainArticles: [...filtredMainArticles]
            }
        case SET_COMMENTS_PROFILE_ARTICLE:
            const findedCommentProfileArticle = state.profileArticles.find(art => art.id === action.payload.articleId)
            findedCommentProfileArticle.comments_data = action.payload.comments
            const filtredProfileArticles = []
            for (let i = 0; i <= state.profileArticles.length - 1; i++) {
                if (state.profileArticles[i].id === action.payload.articleId) {
                    filtredProfileArticles.push(findedCommentProfileArticle)
                } else {
                    filtredProfileArticles.push(state.profileArticles[i])
                }
            }
            return {
                ...state,
                profileArticles: [...filtredProfileArticles]
            }
        default:
            return state
    }
}


// ======== Action creators (AC) ========
const setMainArticlesAC = (data) => ({
    type: SET_MAIN_ARTICLES, 
    payload: data
})

const setProfileArticlesAC = (data) => ({
    type: SET_PROFILE_ARTICLES,
    payload: data
})

export const setArticlesFilterType = (type) => ({
    type: SET_FILTER_TYPE,
    payload: type
})

export const setCommentsMainArticle = (comments, articleId) => ({
    type: SET_COMMENTS_MAIN_ARTICLE,
    payload: {comments, articleId}
})

export const setCommentsProfileArticle = (comments, articleId) => ({
    type: SET_COMMENTS_PROFILE_ARTICLE,
    payload: {comments, articleId}
})


// ======== Thunks ========
export const getMainArticles = (authId = null) => async (dispatch) => {
    const data = await articlesAPI.getMainArticles(authId)
    dispatch(setMainArticlesAC(data))
}

export const getProfileArticles = (profileId) => async (dispatch) => {
    const data = await articlesAPI.getProfileArticles(profileId)
    dispatch(setProfileArticlesAC(data))
}

export const likeArticle = (profileId, articleId, authId) => async (dispatch) => {
    const data = await articlesAPI.likeArticle(profileId, articleId, authId)
    if (data.statusCode !== 1) {
        setError('Невозможно поставить лайк')
    }
}


export default articleReducer