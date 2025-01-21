import { commentsAPI } from "../../api/api"
import { createComment } from "../../utils/commentCreator"
import { setCommentsMainArticle, setCommentsProfileArticle } from "./articleReducer"
import { setCommentsMainPost, setCommentsProfilePost } from "./postReducer"
import { setError } from "./errorReducer"


// ======== Thunks ========
export const getArticleComments = (commentsId, articleId, articleType = 'main') => async (dispatch) => {
    const data = await commentsAPI.getComments(commentsId)
    if (data.statusCode === 1) {
        if (articleType === 'main') {
            dispatch(setCommentsMainArticle(data.data, articleId))
        } else {
            dispatch(setCommentsProfileArticle(data.data, articleId))
        }
    } else {
        setError('Не удалось получить комментарии')
    }
}

export const getPostComments = (commentsId, articleId, postType = 'main') => async (dispatch) => {
    const data = await commentsAPI.getComments(commentsId)
    if (data.statusCode === 1) {
        if (postType === 'main') {
            dispatch(setCommentsMainPost(data.data, articleId))
        } else {
            dispatch(setCommentsProfilePost(data.data, articleId))
        }
    } else {
        setError('Не удалось получить комментарии')
    }
}

export const commentArticle = (text, commentsId, articleId, authorId, articleType = 'main') => async (dispatch, getState) => {
    if (getState().auth.isAuth) {
        const comment = createComment(text, getState().auth.username, getState().auth.id)
        const data = await commentsAPI.sendCommentToArticle(comment, authorId, articleId)
        if (data.statusCode === 1) {
            dispatch(getArticleComments(commentsId, articleId, articleType))
        } else {
            setError('Не удалось прокомментировать')
        }
    } else {
        setError('Войдите в аккаунт, прежде чем комментировать')
    }
}

export const commentPost = (text, commentsId, postId, authorId, postType = 'main') => async (dispatch, getState) => {
    if (getState().auth.isAuth) {
        const comment = createComment(text, getState().auth.username, getState().auth.id)
        const data = await commentsAPI.sendCommentToPost(comment, authorId, postId)
        if (data.statusCode === 1) {
            dispatch(getPostComments(commentsId, postId, postType))
        } else {
            setError('Не удалось прокомментировать')
        } 
    } else {
        setError('Войдите в аккаунт, прежде чем комментировать')
    }
}

export const likeComment = (commentId, likeAuthorId) => async (dispatch, getState) => {
    if (getState().auth.isAuth) {
        const data = await commentsAPI.likeComment(commentId, likeAuthorId)
        if (data.statusCode !== 1) {
            setError('Невозможно поставить лайк')
        }
    } else {
        setError('Войдите в аккаунт, прежде чем ставить лайк')
    }
}

export const dislikeComment = (commentId, dislikeAuthorId) => async (dispatch, getState) => {
    if (getState().auth.isAuth) {
        const data = await commentsAPI.dislikeComment(commentId, dislikeAuthorId)
        if (data.statusCode !== 1) {
            setError('Невозможно поставить дизлайк')
        } 
    } else {
        setError('Войдите в аккаунт, прежде чем ставить дизлайк')
    }
}
