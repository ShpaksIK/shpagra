import { articlesAPI, commentsAPI } from '../../api/api'
import { articleCreator } from '../../utils/articleCreator'
import { formattedDateCreator } from '../../utils/formattedDateCreator'
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
const SET_DRAFT_ARTICLES = 'SET_DRAFT_ARTICLES'
const SET_MODERATION_ARTICLES = 'SET_MODERATION_ARTICLES'
const ADD_ELEMENT_TO_ARTICLE = 'ADD_ELEMENT_TO_ARTICLE'

let defaultState = {
    mainArticles: [],
    profileArticles: [],
    draftArticles: [],
    moderationArticles: [],
    editingArticle: {},
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
                editingArticle: {
                    ...action.payload
                }
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
        case SET_DRAFT_ARTICLES:
            return {
                ...state,
                draftArticles: action.payload
            }
        case SET_MODERATION_ARTICLES:
            return {
                ...state,
                moderationArticles: action.payload
            }
        case ADD_ELEMENT_TO_ARTICLE:
            return {
                ...state,
                editingArticle: {
                    ...state.editingArticle,
                    content: [...state.editingArticle.content, action.payload]
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

export const setEditingArticleAC = (article) => ({
    type: CHANGE_EDITING_ARTICLES_DATA,
    payload: article
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

const addElementToArticleAC = (element) => ({
    type: ADD_ELEMENT_TO_ARTICLE,
    payload: element
})

const setFullArticleContentAC = (fullArticle) => ({
    type: SET_FULL_ARTICLE_CONTENT,
    payload: fullArticle
})

const setDraftArticles = (draftArticles) => ({
    type: SET_DRAFT_ARTICLES,
    payload: draftArticles
})

const setModerationArticles = (moderationArticles) => ({
    type: SET_MODERATION_ARTICLES,
    payload: moderationArticles
})

// ======== Thunks ========
export const getMainArticles = (authId = null) => async (dispatch) => {
    // Получить статьи главной ленты
    const data = await articlesAPI.getMainArticles(authId)
    dispatch(setMainArticlesAC(data))
}

export const getProfileArticles = (profileId) => async (dispatch, getState) => {
    // Получить статьи профиля (profileId берется из URL адреса)
    const data = await articlesAPI.getProfileArticles(profileId, getState().auth.id)
    if (data.statusCode === 1) {
        dispatch(setProfileArticlesAC(data.profileArticles))
        if (profileId === getState().auth.id) {
            dispatch(setDraftArticles(data.draftArticles))
            dispatch(setModerationArticles(data.moderationArticles))
        }
    } else {
        dispatch(setError('Произошла ошибка при загрузке профиля'))
    }
}

export const likeArticle = (profileId, articleId, authId) => async (dispatch) => {
    // Поставить лайк / убрать лайк
    if (authId) {
        const data = await articlesAPI.likeArticle(profileId, articleId, authId)
        if (data.statusCode !== 1) {
            dispatch(setError('Невозможно поставить лайк'))
        }
    } else {
        dispatch(setError('Войдите в аккаунт, прежде чем ставить лайк'))
    }
}

export const getArticleContent = (articleId) => async (dispatch) => {
    // Получить все данные статьи
    dispatch(setFullArticleContentAC({}))
    const data = await articlesAPI.getFullArticle(articleId)
    if (data.statusCode === 1) {
        const commentsData = await commentsAPI.getComments(data.data.comments_id)
        if (commentsData.statusCode === 1) {
            data.data.comments_data = commentsData.data
            dispatch(setFullArticleContentAC(data.data))
        } else {
            dispatch(setError('Не удалось получить комментарии'))
        }
    } else {
        dispatch(setError('Произошла ошибка при загрузке статьи'))
    }
}

export const getArticleForEditing = (articleId, type) => async (dispatch, getState) => {
    // Получить статью для её редактирования
    // (без некоторых данных, например без комментариев)
    dispatch(setEditingArticleAC({}))
    if (type !== 'public') {
        const isAuthor = await articlesAPI.isAuthorArticle(articleId, getState().auth.id, type)
        if (isAuthor.data.isAuthor) {
            let fullArticleData
            if (isAuthor.data.from === 'draft') {
                fullArticleData = await articlesAPI.getArticleForEditingFormDraft(articleId)
            } else {
                fullArticleData = await articlesAPI.getArticleForEditingFormModer(articleId)
            }
            if (fullArticleData.statusCode === 1) {
                dispatch(setEditingArticleAC(fullArticleData.data))
            } else {
                dispatch(setError('Произошла ошибка при загрузке статьи'))
            }
        } else {
            dispatch(setError('Вы не можете редактировать эту статью'))
            dispatch(setEditingArticleAC({
                'status_code': 403
            }))
        }
    } else {
        // Иначе добавляем публичную статью в черновик и открываем её
        const isAuthor = await articlesAPI.isAuthorPublicArticle(articleId, getState().auth.id)
        if (isAuthor.data.isAuthor) {
            const fullArticleData = await articlesAPI.getArticleForEditingFormMain(articleId, getState().auth.id)
            if (fullArticleData.statusCode === 1) {
                // Сделать добавление в черновик
                // ...
                dispatch(setEditingArticleAC(fullArticleData.data))
            } else {
                dispatch(setError('Возникла непредвиденная ошибка'))
            }
        } else {
            dispatch(setError('Вы не можете редактировать эту статью'))
            dispatch(setEditingArticleAC({
                'status_code': 403
            }))
        }
    }

    // const isAuthor = await articlesAPI.isAuthorArticle(articleId, getState().auth.id)
    // if (isAuthor.data.isAuthor) {
    //     let fullArticleData
    //     if (isAuthor.data.isDraft) {
    //         console.log('draft')
    //         fullArticleData = await articlesAPI.getArticleForEditing(articleId)
    //     } else {
    //         fullArticleData = await articlesAPI.getFullArticle(articleId)
    //     }
    //     if (fullArticleData.statusCode === 1) {
    //         dispatch(setEditingArticleAC(fullArticleData.data))
    //     } else {
    //         dispatch(setError('Произошла ошибка при загрузке статьи'))
    //     }
    // } else {
    //     dispatch(setError('Вы не можете редактировать эту статью'))
    //     dispatch(setEditingArticleAC({
    //         'status_code': 403
    //     }))
    // }
}

export const createArticle = () => async (dispatch, getState) => {
    // Инициализация новой статьи
    dispatch(setEditingArticleAC({}))
    dispatch(setEditingArticleAC({
        ...articleCreator('', '', getState().auth.username, getState().auth.id),
        'content': [{
            'type': 'title',
            'text': 'Начните писать'
        },]
    }))
}

export const requestArticle = (article) => async (dispatch, getState) => {
    // Добавление в БД новой или обновленной статьи на проверку модерацией
    const data = await articlesAPI.requestArticle({
        ...getState().article.editingArticle,
        ...article,
        'created_at': formattedDateCreator(),
        'old_id': getState().article.editingArticle.id
    })
    if (data.statusCode === 1) {
        
    } else if (data.statusCode === 2) {
        dispatch(setError('Вы не можете подать более 1-го запроса на публикацию статьи. Текущая статья сохранена в черновиках'))
        dispatch(saveArticleToDraft(article))
    } else {
        dispatch(setError('Произошла ошибка при запросе на публикацию'))
    }
}

export const saveArticleToDraft = (article) => async (dispatch, getState) => {
    // Сохранение статьи в черновик пользователя (запрос в БД)
    if (getState().article.editingArticle.id) {
        const data = await articlesAPI.updateArticleToDraft({
            ...getState().article.editingArticle,
            ...article,
            'created_at': formattedDateCreator(),
            'old_id': getState().article.editingArticle.id
        }, getState().auth.id)
        if (data.statusCode === 1) {
            
        } else {
            dispatch(setError('Произошла ошибка при сохранении статьи'))
        }
    } else {
        const data = await articlesAPI.saveArticleToDraft({
            ...getState().article.editingArticle,
            ...article,
            'created_at': formattedDateCreator(),
            'old_id': getState().article.editingArticle.id
        }, getState().auth.id)
        if (data.statusCode === 1) {
            
        } else {
            dispatch(setError('Произошла ошибка при сохранении статьи'))
        }
    }
}

export const saveCurrentArticleToDraft = (articleId) => async (dispatch, getState) => {
    dispatch(getArticleForEditing(articleId))
    // const data = await articlesAPI.saveArticleToDraft({
    //     ...getState().article.editingArticle,
    //     'created_at': formattedDateCreator(),
    //     'old_id': getState().article.editingArticle.id
    // }, getState().auth.id)
    // if (data.statusCode === 1) {
        
    // } else {
    //     dispatch(setError('Произошла ошибка при добавлении статьи в черновик'))
    // }
}

export const addElementToArticle = (element) => async (dispatch) => {
    dispatch(addElementToArticleAC(element))
}


export default articleReducer