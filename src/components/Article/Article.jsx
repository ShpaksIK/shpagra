import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import style from './style.module.scss'
import avatarIMG from './../../assets/img/avatar.png'
import likeSVG from './../../assets/svg/like.svg'
import commentSVG from './../../assets/svg/comment.svg'
import settingsSVG from './../../assets/svg/settings.svg'
import { likeArticle } from '../../redux/reducers/articleReducer'
import { getProfileAvatar } from '../../redux/reducers/profileReducer'
import Comments from '../Comments/Comments'


const Article = (props) => {
    useEffect(() => {
        props.getProfileAvatar(props.articleData.author_id, 'article', props.articleData.id)
    }, [])

    const [isLike, setIsLike] = useState(props.articleData.likes_id.filter(id => id === props.id).length === 1 ? true : false)
    const [isOpenComments, setIsOpenComments] = useState(false)

    const likeArticle = (profileId, articleId) => {
        if (props.isAuth) {
            setIsLike(!isLike)
            props.likeArticle(profileId, articleId, props.id)
        }
    }

    const scopesElements = props.articleData.scopes.map((scop) => <div key={scop}>{scop}</div>)

    return (
        <div className={style.article}>
            <Link to={`/article/${props.articleData.id}`}>
                <div className={style.picture}>
                    <img src={props.articleData.banner} />
                </div>
            </Link>
            <div className={style.info}>
                <div className={style.author}>
                    <Link to={`/profile/${props.articleData.author_id}`}>
                        <div className={style.avatar}>
                            {props.objectType === 'profile' && (
                                <img src={URL.createObjectURL(props.avatarProfile)} alt='Фото профиля' />
                            )}
                            {props.objectType !== 'profile' && (
                                <>
                                    {props.articleData.author_avatar && <img src={URL.createObjectURL(props.articleData.author_avatar)} alt='Фото профиля' />}
                                    {!props.articleData.author_avatar && <img src={avatarIMG} />}
                                </>
                            )}
                        </div>
                    </Link>
                    <div className={style.author_info}>
                        <div className={style.name}>
                            <Link to={`/profile/${props.articleData.author_id}`}><p>{props.articleData.author}</p></Link>
                        </div>
                        <div className={style.articleLikes}>
                            <p>{props.articleData.likes_count} понравилось</p>
                        </div>
                    </div>
                    <div className={style.video_info}>
                        <div className={style.scopes}>
                            {scopesElements}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={style.title}>
                        <Link to={`/article/${props.articleData.id}`}><b>{props.articleData.title}</b></Link>
                    </div>
                    <div className={style.description}>
                        <Link to={`/article/${props.articleData.id}`}><p>{props.articleData.description}</p></Link>
                    </div>
                </div>
                <div className={style.article_footer}>
                    <div className={classNames(
                            style.article_footer_block, 
                            {[`${style.article_footer_block_like}`]: isLike}
                        )}
                        onClick={() => likeArticle(props.articleData.author_id, props.articleData.id)}>
                            <img src={likeSVG} />
                            <p>{props.articleData.likes_count}</p>
                    </div>
                    <div className={classNames(
                            style.article_footer_block, 
                            {[`${style.article_footer_block_comment}`]: isOpenComments}
                        )}
                        onClick={() => setIsOpenComments(prev => !prev)}>
                            <img src={commentSVG} />
                            <p>{props.articleData.comments_count}</p>
                    </div>
                    {props.id === props.articleData.author_id && (
                        <Link to={`/article-creator/p/${props.articleData.id}`}>
                            <div className={style.article_footer_block}>
                                <img src={settingsSVG} />
                                <p>Редактировать</p>
                            </div>
                        </Link>
                    )}
                    <div className={style.article_createData}>
                        <p>{props.articleData.created_at}</p>
                    </div>
                </div>
                {isOpenComments && (
                    <Comments sendType='article' objectId={props.articleData.id} commentsData={props.articleData.comments_data} commentsId={props.articleData.comments_id} authorId={props.articleData.author_id} objectType={props.objectType} />
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        id: state.auth.id,
        mainArticles: state.article.mainArticles,
        profileArticles: state.article.profileArticles,
        avatarProfile: state.profile.avatar
    }
}

export default connect(mapStateToProps, {likeArticle, getProfileAvatar})(Article)