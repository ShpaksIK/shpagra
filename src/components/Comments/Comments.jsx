import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import { getArticleComments, getPostComments } from '../../redux/reducers/commentReducer'
import Comment from './Comment/Comment'
import Preloader from '../Preloader/Preloader'
import CommentsForm from './CommentsForm/CommentsForm'


const Comments = (props) => {
    useEffect(() => {
        if (props.sendType === 'post') {
            props.getPostComments(props.commentsId, props.objectId, props.objectType ? 'profile' : 'main')
        } else {
            props.getArticleComments(props.commentsId, props.objectId, props.objectType ? 'profile' : 'main')
        }
    }, [])

    return (
        <div className={style.comments}>
            {props.commentsData ? props.commentsData.map(com => <Comment key={`com-${com.id}`} commentData={com} />) : <Preloader />}
            <CommentsForm commentsId={props.commentsId} objectId={props.objectId} authorId={props.authorId} objectType={props.objectType} sendType={props.sendType} />
        </div>
    )
}

export default connect(null, {getArticleComments, getPostComments})(Comments)