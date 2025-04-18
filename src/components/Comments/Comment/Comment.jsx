import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import style from '../style.module.scss'
import avatarIMG from './../../../assets/img/avatar.png'
import likeSVG from './../../../assets/svg/like.svg'
import garbageSVG from './../../../assets/svg/garbage.svg'
import { likeComment, dislikeComment, removeComment } from '../../../redux/reducers/commentReducer'


const Comment = (props) => {
    const [isLike, setIsLike] = useState(props.commentData.likes_id.filter(id => id === props.id).length === 1 ? true : false)
    const [isDislike, setIsDislike] = useState(props.commentData.dislike_id.filter(id => id === props.id).length === 1 ? true : false)
    
    const likeComment = (commentId, likeAuthorId) => {
        setIsDislike(false)
        setIsLike(!isLike)
        props.likeComment(commentId, likeAuthorId)
    }

    const dislikeComment = (commentId, dislikeAuthorId) => {
        setIsLike(false)
        setIsDislike(!isDislike)
        props.dislikeComment(commentId, dislikeAuthorId)
    }

    const removeComment = (commentId) => {
        props.removeComment(commentId, props.commentsId, props.sendType, props.objectType, props.objectId, props.authorId)
    }

    return (
        <div className={style.comment}>
            <div className={style.comment_header}>
                <div className={style.comment_header_profile}>
                    <Link to={`/profile/${props.commentData.author_id}`}>
                        {props.commentData.author_avatar && <img src={URL.createObjectURL(props.commentData.author_avatar)} alt='Фото профиля' />}
                        {!props.commentData.author_avatar && <img src={avatarIMG} />}
                    </Link>
                    <Link to={`/profile/${props.commentData.author_id}`}><p>{props.commentData.author}</p></Link>
                </div>
                <div className={style.comment_header_date}>
                    <p>{props.commentData.created_at}</p>
                </div>
            </div>
            <div className={style.comment_content}>
                <p>{props.commentData.text}</p>
                {props.isAuth && (
                    <div className={style.comment_content_footer}>
                        {props.commentData.author_id === props.id && (
                            <div className={style.comment_footer_block} 
                                onClick={() => removeComment(props.commentData.id)}>
                                    <img src={garbageSVG} alt='Удалить комментарий' />
                            </div>
                        )}
                        <div className={classNames(
                                style.comment_footer_block, 
                                {[`${style.comment_footer_block_like}`]: isLike}
                            )} 
                            onClick={() => likeComment(props.commentData.id, props.id)}>
                                <img src={likeSVG} />
                                <p>{props.commentData.likes_count}</p>
                        </div>
                        <div className={classNames(
                                style.comment_footer_block, style.dislike, 
                                {[`${style.comment_footer_block_dislike}`]: isDislike}
                            )} 
                            onClick={() => dislikeComment(props.commentData.id, props.id)}>
                                <img src={likeSVG} />
                                <p>{props.commentData.dislike_count}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        id: state.auth.id
    }
}

export default connect(mapStateToProps, {likeComment, dislikeComment, removeComment})(Comment)