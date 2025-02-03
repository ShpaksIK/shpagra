import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import emailSVG from './../../assets/svg/email.svg'
import subscribeSVG from './../../assets/svg/subscribe.svg'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Article from '../../components/Article/Article'
import Post from '../../components/Post/Post'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { getProfileArticles } from '../../redux/reducers/articleReducer'
import { getProfilePosts } from '../../redux/reducers/postReducer'
import Preloader from '../../components/Preloader/Preloader'
import ArticleDraft from '../../components/ArticleDraft/ArticleDraft'


const ProfilePage = (props) => {
    // Состояния для изменения Preloader на надпись об отсутствии статей и постов
    const [loadArticlesBlock, setLoadArticlesBlock] = useState(<Preloader />)
    const [loadPostsBlock, setLoadPostsBlock] = useState(<Preloader />)
    
    // Тайм-ауты для показа надписи об отсутствии статей и постов после Preloader
    setTimeout(() => {
        setLoadArticlesBlock(
            <div className={style.content_body_error}>
                <b>Вы ещё ничего не добавили</b>
                <Link to='/create-article' className={style.button}>Создать статью</Link>
            </div>
        )
    }, 5000)
    setTimeout(() => {
        setLoadPostsBlock(
            <div className={style.content_body_error}>
                <b>У вас нет постов!</b>
                <CreatePostForm />
            </div>
        )
    }, 5000)

    // Получение статей и постов пользователя
    useEffect(() => {
        props.getProfileArticles(props.id)
        props.getProfilePosts(props.id)
    }, [])

    return (
        <div className={style.main}>
            <Header />

            {props.isAuth && (
                <div className={style.blocks}>
                    <div className={style.left_blocks}>
                        <div className={style.block1}>
                            <div className={style.info_title}>
                                <img src='https://zornet.ru/_fr/19/0640572.png' />
                                <b>{props.username}</b>
                            </div>
                            <div className={style.info_body}>
                                <div className={style.info_body_block}>
                                    <div className={style.info_body_block_img}>
                                        <img src={emailSVG} />
                                    </div>
                                    <p><b>E-mail:</b> {props.email}</p>
                                </div>
                                <div className={style.info_body_block}>
                                    <div className={style.info_body_block_img}>
                                        <img src={subscribeSVG} />
                                    </div>
                                    {props.followersCount ? <p><b>Подписчиков:</b> {props.followersCount}</p> : <p>Подписчиков нет</p>}
                                </div>
                                <div className={style.info_body_block}>
                                    <Link className={style.info_body_block_a} to={`/profile/${props.id}`}>Как другие видят меня?</Link>
                                </div>
                            </div>
                        </div>

                        <div className={style.block1}>
                            <div className={style.info_title}>
                                <b>Редактировать</b>
                            </div>
                            <div className={style.info_body}>
                                <CreatePostForm />
                                <div className={style.info_body_block}>
                                    <Link to='/article-creator' className={style.button}>Создать статью</Link>
                                </div>
                                <div className={style.info_body_block}>
                                    <label><b>Загрузить фото профиля:</b></label>
                                    <input type='file' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.right_blocks}>
                        <div className={style.content_block}>
                            <div className={style.content_title}>
                                <b>Мои статьи</b>
                            </div>
                            <div className={style.content_body}>
                                {props.articles ? <>
                                    {props.articles.map(article => <Article key={`art-${article.id}`} className={style.article} articleData={article} objectType='profile' />)}
                                </> : loadArticlesBlock}
                            </div>
                        </div>
                        {props.draft.length > 0 && (
                            <div className={style.content_block}>
                                <div className={style.content_title}>
                                    <b>Черновик</b>
                                </div>
                                <div className={style.content_body}>
                                    {props.draft.map(article => <ArticleDraft key={`art-draft-${article.id}`} articleDraftData={article} />)}
                                </div>
                            </div>
                        )}
                        {props.moderation.length > 0 && (
                            <div className={style.content_block}>
                                <div className={style.content_title}>
                                    <b>На проверке</b>
                                </div>
                                <div className={style.content_body}>
                                    {props.moderation.map(article => <div key={article.id}>{article.title}</div>)}
                                </div>
                            </div>
                        )}
                        <div className={style.content_block}>
                            <div className={style.content_title}>
                                <b>Мои посты</b>
                            </div>
                            <div className={style.content_body}>
                                {props.posts ? <>
                                    {props.posts.map(post => <div key={post.id} className={style.post}><Post postData={post} objectType='profile' /></div>)}
                                </> : loadPostsBlock}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {props.isAuth !== true && (
                <div className={style.noLogin}>
                    <h1>Вы не авторизованы</h1>
                    <Link to='/login' className={style.link}>Войти в аккаунт</Link>
                </div>
            )}

            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id,
    username: state.auth.username,
    email: state.auth.email,
    followersCount: state.auth.followersCount,
    articles: state.article.profileArticles,
    draft: state.article.draftArticles,
    moderation: state.article.moderationArticles,
    posts: state.post.profilePosts
})

export default connect(mapStateToProps, {getProfileArticles, getProfilePosts})(ProfilePage)