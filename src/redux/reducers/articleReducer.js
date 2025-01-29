import { articlesAPI, commentsAPI } from '../../api/api'
import { setError } from './errorReducer'


// ======== Initialize ========
const SET_MAIN_ARTICLES = 'SET_MAIN_ARTICLES'
const SET_PROFILE_ARTICLES = 'SET_PROFILE_ARTICLES'
const CHANGE_EDITING_ARTICLES_DATA = 'CHANGE_EDITING_ARTICLES_DATA'
const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
const SET_COMMENTS_MAIN_ARTICLE = 'SET_COMMENTS_MAIN_ARTICLE'
const SET_COMMENTS_PROFILE_ARTICLE = 'SET_COMMENTS_PROFILE_ARTICLE'
const SET_FULL_ARTICLE_CONTENT = 'SET_FULL_ARTICLE_CONTENT'
const SET_COMMENTS_FULL_ARTICLE = 'SET_COMMENTS_FULL_ARTICLE'

let defaultState = {
    mainArticles: [],
    profileArticles: [],
    editingArticle: null,
    filterType: 'popular',
    fullArticleContent: {}
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
        case SET_FULL_ARTICLE_CONTENT:
            return {
                ...state,
                fullArticleContent: action.payload
            }
        case SET_COMMENTS_FULL_ARTICLE:
            return {
                ...state,
                fullArticleContent: {
                    ...state.fullArticleContent,
                    comments_data: action.payload
                }
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

export const setArticlesFilterTypeAC = (type) => ({
    type: SET_FILTER_TYPE,
    payload: type
})

export const setCommentsMainArticleAC = (comments, articleId) => ({
    type: SET_COMMENTS_MAIN_ARTICLE,
    payload: {comments, articleId}
})

export const setCommentsProfileArticleAC = (comments, articleId) => ({
    type: SET_COMMENTS_PROFILE_ARTICLE,
    payload: {comments, articleId}
})

export const setCommentsViewArticleAC = (comments) => ({
    type: SET_COMMENTS_FULL_ARTICLE,
    payload: comments
})

const setFullArticleContentAC = (fullArticle) => ({
    type: SET_FULL_ARTICLE_CONTENT,
    payload: fullArticle
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
    if (authId) {
        const data = await articlesAPI.likeArticle(profileId, articleId, authId)
        if (data.statusCode !== 1) {
            setError('Невозможно поставить лайк')
        }
    } else {
        setError('Войдите в аккаунт, прежде чем ставить лайк')
    }
}

export const getArticleContent = (articleId) => async (dispatch) => {
    dispatch(setFullArticleContentAC({}))
    const data = await articlesAPI.getFullArticle(articleId)
    if (data.statusCode === 1) {
        const commentsData = await commentsAPI.getComments(data.data.comments_id)
        if (commentsData.statusCode === 1) {
            data.data.comments_data = commentsData.data
            dispatch(setFullArticleContentAC(data.data))
        } else {
            setError('Не удалось получить комментарии')
        }
    } else {
        setError('Произошла ошибка при загрузке статьи')
    }
}


export default articleReducer