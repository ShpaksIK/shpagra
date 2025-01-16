import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import style from './style.module.scss'
import likeSVG from './../../assets/svg/like.svg'
import commentSVG from './../../assets/svg/comment.svg'
import { likePost } from '../../redux/reducers/postReducer'
import Comments from '../Comments/Comments'


const Post = (props) => {
    const [isLike, setIsLike] = useState(props.postData.likes_id.filter(id => id === props.id).length === 1 ? true : false)
    const [isOpenComments, setIsOpenComments] = useState(false)
    
    const likePost = (profileId, postId) => {
        setIsLike(!isLike)
        props.likePost(profileId, postId, props.id)
    }

    return (
        <div className={style.post}>
            <div className={style.post_author}>
                <Link to={`/profile/${props.postData.authorId}`}><img src='https://zornet.ru/_fr/19/0640572.png' /></Link>
                <Link className={style.linkAuthor} to={`/profile/${props.postData.author_id}`}>{props.postData.author}</Link>
            </div>
            <div className={style.post_info}>
                <p>{props.postData.text}</p>
            </div>
            <div className={style.post_footer}>
                <div className={classNames(
                        style.post_footer_block, 
                        {[`${style.post_footer_block_like}`]: isLike}
                    )} 
                    onClick={() => likePost(props.postData.author_id, props.postData.id)}>
                        <img src={likeSVG} />
                        <p>{props.postData.likes_count}</p>
                </div>
                <div className={classNames(
                        style.post_footer_block, 
                        {[`${style.post_footer_block_comment}`]: isOpenComments}
                    )} 
                    onClick={() => setIsOpenComments(prev => !prev)}>
                        <img src={commentSVG} />
                        <p>{props.postData.comments_count}</p>
                </div>
            </div>
            {isOpenComments && (
                <Comments sendType='post' objectId={props.postData.id} commentsData={props.postData.comments_data} commentsId={props.postData.comments_id} authorId={props.postData.author_id} objectType={props.objectType} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        mainPosts: state.post.mainPosts,
        profilePosts: state.post.profilePosts
    }
}

export default connect(mapStateToProps, {likePost})(Post)